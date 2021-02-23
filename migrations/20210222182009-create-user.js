'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable(
        'user',
        {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
          email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
          },
          hash: Sequelize.STRING,
          reset_token: Sequelize.STRING,
          telegram_id: Sequelize.STRING,
          name: Sequelize.STRING,
          surname: Sequelize.STRING,
          patronymic: Sequelize.STRING,
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
    // await queryInterface.dropTable('user')
  }
}
