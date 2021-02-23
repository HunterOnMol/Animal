const { STRING, INTEGER } = require('sequelize')
const Database = require('../database/database')
const AlertType = require('./AlertType')
const Animal = require('./Animal')

const Alert = Database.define(
  'alert',
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    animal_id: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: Animal,
        key: 'id'
      }
    },
    day_of_week: STRING,
    time: STRING,
    description: STRING(10000),
    type_id: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: AlertType,
        key: 'id'
      }
    }
  },
  {
    timestamps: true,
    paranoid: true
  }
)

module.exports = Alert
