const { STRING, INTEGER } = require('sequelize')
const Database = require('../database/database')

const User = Database.define(
  'user',
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    email: {
      type: STRING,
      allowNull: false,
      unique: true
    },
    hash: STRING,
    reset_token: STRING,
    telegram_id: STRING,
    name: STRING,
    surname: STRING,
    patronymic: STRING
  },
  {
    timestamps: true,
    paranoid: true
  }
)

module.exports = User
