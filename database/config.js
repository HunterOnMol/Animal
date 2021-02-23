require('dotenv').config({
  path: '.env'
})

module.exports = {
  development: {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DEV,
    host: process.env.POSTGRES_HOSTNAME,
    port: process.env.POSTGRES_PORT,
    dialect: 'postgres',
    seederStorage: 'sequelize'
  },
  production: {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_MASTER,
    host: process.env.POSTGRES_HOSTNAME,
    port: process.env.POSTGRES_PORT,
    dialect: 'postgres',
    seederStorage: 'sequelize'
  }
}
