const { STRING, INTEGER, DATE } = require('sequelize')
const Database = require('../database/database')
const User = require('../models/User')

const Animal = Database.define(
  'animal',
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    user_id: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    },
    name: STRING,
    birth: DATE,
    description: STRING(10000)
  },
  {
    timestamps: true,
    paranoid: true
  }
)

module.exports = Animal
