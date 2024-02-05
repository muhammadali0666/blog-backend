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
  },
  text: {
    type: DataTypes.TEXT,
  },
  img: {
    type: DataTypes.TEXT,
  },
});

module.exports = Posts;
