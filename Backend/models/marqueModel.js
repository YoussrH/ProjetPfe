const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Marque = sequelize.define(
  "Marque",
  {
    name: { type: DataTypes.STRING, allowNull: false },
  },
  { tableName: "marques", timestamps: true }
);

module.exports = Marque;
