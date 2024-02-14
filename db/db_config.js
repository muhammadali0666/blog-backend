const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();
const sequelize = new Sequelize(process.env.ELEPHANTSQLBASE, {
  logging: false,
});

sequelize
  .authenticate()
  .then(() => console.log("Connected"))
  .catch((err) => console.log(err));

module.exports = {
  sequelize,
  DataTypes,
};
