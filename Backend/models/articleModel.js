const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Article = sequelize.define("Article", {
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  price: { type: DataTypes.FLOAT, allowNull: false },
  discount: { type: DataTypes.FLOAT, defaultValue: 0 },
  finalPrice: { type: DataTypes.FLOAT, allowNull: false },
  stock: { type: DataTypes.INTEGER, defaultValue: 0 },
  sku: { type: DataTypes.STRING, unique: true },
  images: { type: DataTypes.JSON }, // Store Cloudinary image URLs
  seoTitle: { type: DataTypes.STRING },
  seoKeywords: { type: DataTypes.TEXT },
  categoryId: { type: DataTypes.INTEGER, references: { model: "categories", key: "id" } },
  marqueId: { type: DataTypes.INTEGER, references: { model: "marques", key: "id" } },
}, { tableName: "articles" });

module.exports = Article;