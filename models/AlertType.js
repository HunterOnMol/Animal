const { STRING, INTEGER } = require('sequelize')
const Database = require('../database/database')

const AlertType = Database.define(
  'alert_type',
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: STRING,
    description: STRING(10000)
  },
  {
    timestamps: false,
    paranoid: false
  }
)

module.exports = AlertType
