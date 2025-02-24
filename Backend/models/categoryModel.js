const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Adjust the path if needed

const Category = sequelize.define(
  "Category",
  {
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    tableName: "categories",
    timestamps: true,
    createdAt: 'created_at',  // Specify the correct column name
    updatedAt: 'updated_at',  // Specify the correct column name
  }
);


module.exports = Category;
