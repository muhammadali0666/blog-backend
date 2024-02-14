const { sequelize, DataTypes } = require("../db/db_config");
const { UUIDV4 } = require("sequelize");

const Posts = sequelize.define("posts", {
  id: {
    type: DataTypes.TEXT,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  img: {
    type: DataTypes.TEXT,
    allowNull: false
  },
});

module.exports = Posts;
