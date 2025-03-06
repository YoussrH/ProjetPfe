 const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Category = require("./categoryModel");
const Marque = require("./marqueModel");
const Genre = require("./genreModel");
const Taille = require("./tailleModel");

const Couleur = require("./couleurModel");

// Define the Article model
const Article = sequelize.define("Article", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.TEXT,
  conseils: {
    type: DataTypes.TEXT, 
    allowNull: true, 
  },
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
  }
  ,

  
});

// Associations
Article.belongsTo(Category, { foreignKey: "categoryId", onDelete: "CASCADE" });
Category.hasMany(Article, { foreignKey: "categoryId" });

Article.belongsTo(Marque, { foreignKey: "marqueId", onDelete: "CASCADE" });
Marque.hasMany(Article, { foreignKey: "marqueId" });

Article.belongsTo(Genre, { foreignKey: "genreId", onDelete: "CASCADE" });
Genre.hasMany(Article, { foreignKey: "genreId" });

// Many-to-Many Relationship (Article - Taille)
Article.belongsToMany(Taille, { through: "ArticleTailles" });
Taille.belongsToMany(Article, { through: "ArticleTailles" });

// Article - Couleur (Many-to-Many)
Article.belongsToMany(Couleur, { through: "ArticleCouleurs" });
Couleur.belongsToMany(Article, { through: "ArticleCouleurs" });


module.exports = Article;


