// models/Remise.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Categorie = require("./CategorieModel");
const Genre = require("./genreModel");
const Taille = require("./tailleModel");

const Remise = sequelize.define(
  "Remise",
  {
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM(
        "pourcentage",
        "montant_fixe",
        "quantite",
        "cumulatif",
        "code_promo",
        "fidelite",
        "premier_achat",
        "deuxieme_article_moitie_prix",
        "bogo",
        "taille",
        "categorie",
        "genre",
        "categorie_genre",
        "categorie_genre_taille"
      ),
      allowNull: false,
    },
    valeur: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    montant_minimum: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    montant_maximum: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    quantite: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    code_promo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    points_fidelite: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    categorie_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Categorie,
        key: "id",
      },
    },
    genre_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Genre,
        key: "id",
      },
    },
    taille_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Taille,
        key: "id",
      },
    },
    date_debut: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    date_fin: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    est_actif: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "remises", // Table name in French
    timestamps: true,
    createdAt: "date_creation",
    updatedAt: "date_mise_a_jour",
  }
);

// Associations
Remise.belongsTo(Categorie, { foreignKey: "categorie_id", onDelete: "CASCADE" });
Remise.belongsTo(Genre, { foreignKey: "genre_id", onDelete: "CASCADE" });
Remise.belongsTo(Taille, { foreignKey: "taille_id", onDelete: "CASCADE" });

module.exports = Remise;