const Database = require('./database')
const logger = require('pino')()
const { sleep } = require('../helpers/sleep')

/**
 * databaseConnection try to establish database connection.
 * Use process.exit if get error
 */
const checkDatabaseConnection = async () => {
  const attempts = 3
  for (let i = 0; i < attempts; i++) {
    try {
      await sleep(7 * 1000)
      await Database.authenticate()
      return
    } catch (err) {
      logger.error(`failed ${i} attempt to establish database connection`, err)
    }
  }

  throw new Error('failed establish database connection')
}

module.exports = checkDatabaseConnection
