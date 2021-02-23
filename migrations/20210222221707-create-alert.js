'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable(
        'alert',
        {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
          animal_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'animal',
              key: 'id'
            }
          },
          day_of_week: Sequelize.STRING,
          time: Sequelize.STRING,
          description: Sequelize.STRING(10000),
          type_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'alert_type',
              key: 'id'
            }
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
          },
          deletedAt: {
            allowNull: true,
            type: Sequelize.DATE
          }
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
    // await queryInterface.dropTable('alert')
  }
}
