const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Genre = sequelize.define(
  "Genre",
  {
    name: { type: DataTypes.STRING, allowNull: false },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Default value
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Default value
    },
  },
  { tableName: "genres", timestamps: true }
);

module.exports = Genre;