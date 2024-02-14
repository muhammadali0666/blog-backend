const { sequelize, DataTypes} = require("../db/db_config")
const { UUIDV4 } = require("sequelize")

const Contacts = sequelize.define("contact", {
  id: {
    type: DataTypes.TEXT,
    defaultValue: UUIDV4,
    primaryKey: true
  },

  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  subject: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
})

module.exports = Contacts;