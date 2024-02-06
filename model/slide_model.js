const {DataTypes, sequelize} = require("../db/db_config")
const { UUIDV4 } = require("sequelize");

const Slides = sequelize.define("slides", {
  id: {
    type: DataTypes.TEXT,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  img: {
    type: DataTypes.TEXT,
  },
});

module.exports = Slides;
