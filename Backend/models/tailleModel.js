const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Taille = sequelize.define("Taille", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define associations
Taille.associate = (models) => {
  Taille.belongsToMany(models.Article, { through: "ArticleTailles" });
};

module.exports = Taille;