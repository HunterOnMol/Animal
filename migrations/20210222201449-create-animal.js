'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable(
        'animal',
        {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
          user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'user',
              key: 'id'
            }
          },
          name: Sequelize.STRING,
          birth: Sequelize.DATE,
          description: Sequelize.STRING(10000),
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
    // await queryInterface.dropTable('animal')
  }
}
