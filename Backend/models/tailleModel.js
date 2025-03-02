const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Category = require("./categoryModel");
const Genre = require("./genreModel");

const Taille = sequelize.define(
  "Taille",
  {
    name: { type: DataTypes.STRING, allowNull: false },
    category_id: { 
      type: DataTypes.INTEGER,
      references: { model: "categories", key: "id" },
    },
    genre_id: { 
      type: DataTypes.INTEGER,
      references: { model: "genres", key: "id" },
    },
  },
  {
    tableName: "tailles", // Ensure Sequelize maps to the correct table
    timestamps: true, // This ensures createdAt and updatedAt are used correctly
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

Taille.belongsTo(Category, { foreignKey: "category_id" });
Taille.belongsTo(Genre, { foreignKey: "genre_id" });

module.exports = Taille;

