const { sequelize, DataTypes} = require("../db/db_config")
const { UUIDV4 } = require("sequelize")

const Imgs = sequelize.define("img", {
  id: {
    type: DataTypes.TEXT,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  img: {
    type: DataTypes.TEXT
  }
})

module.exports = Imgs;