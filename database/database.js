require('dotenv').config({
  path: '.env'
})

const Sequelize = require('sequelize')

const database = new Sequelize(
  process.env.POSTGRES_DATABASE,
  process.env.POSTGRES_USERNAME,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOSTNAME,
    port: process.env.POSTGRES_PORT,
    dialect: 'postgres',

    pool: {
      max: +process.env.POSTGRES_POOL_MAX,
      min: +process.env.POSTGRES_POOL_MIN,
      acquire: 10000,
      idle: 60000,
      evict: 60000
    },

    sync: {
      alter: false,
      force: false
    },

    define: {
      freezeTableName: true
    },

    logging: false
  }
)

module.exports = database
