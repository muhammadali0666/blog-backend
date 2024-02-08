const { sequelize, DataTypes} = require("../db/db_config")
const { UUIDV4 } = require("sequelize")

const Contacts = sequelize.define("contact", {
  id: {
    type: DataTypes.TEXT,
    defaultValue: UUIDV4,
    primaryKey: true
  },

  name: {
    type: DataTypes.TEXT
  },
  email: {
    type: DataTypes.TEXT,
  },
  subject: {
    type: DataTypes.TEXT
  },
  message: {
    type: DataTypes.TEXT,
  },
})

module.exports = Contacts;