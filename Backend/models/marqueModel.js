
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Marque = sequelize.define("Marque", {
  name: {
    type: DataTypes.STRING,  // Ensure you are using DataTypes.STRING
    allowNull: false,
  },
}, {
  tableName: 'marques',  // Explicitly define the table name
});

module.exports = Marque;
