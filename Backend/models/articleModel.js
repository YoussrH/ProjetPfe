const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Article = sequelize.define("Article", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.TEXT,
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  discount: DataTypes.FLOAT,
  finalPrice: DataTypes.FLOAT,
  stock: DataTypes.INTEGER,
  sku: DataTypes.STRING,
  images: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    defaultValue: [],
  },
  seoTitle: DataTypes.STRING,
  seoKeywords: DataTypes.STRING,
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  marqueId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  genreId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tailles: {
    type: DataTypes.ARRAY(DataTypes.INTEGER), // Array of Taille IDs
    allowNull: false,
    defaultValue: [],
  },
});

module.exports = Article;