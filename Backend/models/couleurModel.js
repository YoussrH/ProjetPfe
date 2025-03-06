const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Vérifiez le chemin

const Couleur = sequelize.define("Couleur", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, { tableName: "couleur" });

module.exports = Couleur;
