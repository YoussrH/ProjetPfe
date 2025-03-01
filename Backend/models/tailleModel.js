const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Category = require("./categoryModel");
const Genre = require("./genreModel");

const Taille = sequelize.define("Taille", {
  name: { type: DataTypes.STRING, allowNull: false },
  category_id: { 
    type: DataTypes.INTEGER,
    references: { model: "categories", key: "id" },
  },
  genre_id: { 
    type: DataTypes.INTEGER,
    references: { model: "genres", key: "id" },
  },
});

Taille.belongsTo(Category, { foreignKey: "category_id" });
Taille.belongsTo(Genre, { foreignKey: "genre_id" });

module.exports = Taille;
