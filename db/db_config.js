const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();
const sequelize = new Sequelize({
  username: "postgres",
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DATABASEPORT,
  host: "localhost",
  dialect: "postgres",
  logging: false
})

sequelize
  .authenticate()
  .then(() => console.log("Connected"))
  .catch((err) => console.log(err));

module.exports = {
  sequelize,
  DataTypes,
};
