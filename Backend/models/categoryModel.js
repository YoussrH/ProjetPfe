
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

// Self-referencing associations for subcategories
Category.hasMany(Category, { as: "subcategories", foreignKey: "parentId" });
Category.belongsTo(Category, { as: "parentCategory", foreignKey: "parentId" });

module.exports = Category;
