require('dotenv').config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("inventory", "Yosr", "Yosr123", {
  host: "localhost",
  port: 2103,  // Assure-toi que c'est bien le port correct
  dialect: "postgres",
  logging: console.log, // Active l'affichage des requêtes SQL
});




sequelize.authenticate()
  .then(() => console.log('✅ Connexion à PostgreSQL réussie !'))
  .catch(err => console.error('❌ Erreur de connexion à PostgreSQL :', err));

module.exports = sequelize;
