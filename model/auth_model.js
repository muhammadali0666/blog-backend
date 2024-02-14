const { sequelize, DataTypes} = require("../db/db_config")
const { UUIDV4 } = require("sequelize")

const Users = sequelize.define("auth", {
  id: {
    type: DataTypes.TEXT,
    defaultValue: UUIDV4,
    primaryKey: true
  },

  fullName: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  email: {
    type: DataTypes.TEXT,
    unique: true,
    allowNull: false
  },
  profilePhoto: {
    type: DataTypes.TEXT
  },
  role: {
    type: DataTypes.TEXT,
    defaultValue: 'user'
  },
})

module.exports = Users;