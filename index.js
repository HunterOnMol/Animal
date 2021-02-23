require('dotenv').config({
  path: '.env'
})

const Database = require('./database/database')
const checkDatabaseConnection = require('./database/checkDatabaseConnection')
const logger = require('pino')({ prettyPrint: process.env.FASTIFY_PRETTY })
const fastify = require('fastify')({ logger })
const loader = require('fastify-loader')
const jwt = require('fastify-jwt')
const { readFileSync } = require('fs')
const AuthDecorator = require('./middleware/authDecorator')

// await Database.authenticate()

// const AuthDecorator = require('./lib/authdecorator')

fastify.setErrorHandler((error, request, reply) => {
  const tags = {
    user: request.user,
    url: request.url
  }

  const ctx = {
    ctx: 'error handler',
    body: request.body ? request.body : 'body is missing'
  }
  const child = logger.child({ ...ctx, ...tags })

  let statusCode = error.statusCode
  let local = error.local

  if (error.validation) {
    statusCode = 422
    local = 'Ошибка валидации'
    child.warn(error, {
      type: 'schema validation error'
    })
  } else if (!error.statusCode) {
    statusCode = 418
    child.error(error, {
      type: 'unknown error type',
      description: `some not validation or sendError error (need to investigate it)`
    })
  } else {
    child.error(error, { type: 'sendError' })
  }

  reply
    .headers({
      'access-control-allow-credentials': 'true',
      'access-control-allow-headers': 'Content-Type, Authorization',
      'access-control-allow-methods': 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      'access-control-allow-origin': '*',
      'access-control-expose-headers': 'token'
    })
    .code(statusCode)
    .send({
      statusCode: statusCode,
      error: error.message,
      message: local ? local : error.message
    })
})

// Load all controllers in the api folder
fastify.register(loader, {
  paths: ['./api/**/*.js'],
  inject: {
    __entry: __dirname,
    __env: process.env
  }
})

checkDatabaseConnection()
  .then(async () => {
    fastify.listen(3000, '0.0.0.0', async (err) => {
      if (err) console.trace(err)
      await Database.sync()
    })
  })
  .catch((err) => {
    logger.error(err)
    process.exit()
  })

// JWT
fastify.register(jwt, {
  secret: {
    private: readFileSync(`./certs/jwtPrivate.key`, 'utf8'),
    public: readFileSync(`./certs/jwtPublic.key`, 'utf8')
  },
  sign: {
    algorithm: 'ES256',
    expiresIn: '7 days'
  }
})

fastify.decorate('authenticate', AuthDecorator)

module.exports = fastify
