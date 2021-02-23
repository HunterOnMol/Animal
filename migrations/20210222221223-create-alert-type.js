'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable(
        'alert_type',
        {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
          name: Sequelize.STRING,
          description: Sequelize.STRING(10000)
        },
        { transaction }
      )
      await transaction.commit()
    } catch (err) {
      console.log('err: ', err)
      await transaction.rollback()
    }
  },
  down: async (queryInterface, Sequelize) => {
    // await queryInterface.dropTable('alert_type')
  }
}
