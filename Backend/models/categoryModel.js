/* const { DataTypes } = require("sequelize");
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
); */

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Category = sequelize.define("Category", {
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  parentId: { 
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: "categories", key: "id" },
  },
}, { 
  tableName: "categories",
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

// Self-referencing association for subcategories
Category.hasMany(Category, { as: "subcategories", foreignKey: "parentId" });
Category.belongsTo(Category, { as: "parentCategory", foreignKey: "parentId" });

module.exports = Category;
