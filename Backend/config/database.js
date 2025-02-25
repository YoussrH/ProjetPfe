const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("inventory", "Yosr", "Yosr123", {
  host: "localhost",
  port: 2103, // Ensure this is correct
  dialect: "postgres",
  logging: console.log,
});

sequelize.authenticate()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch(err => console.error("❌ Database connection error:", err));

module.exports = sequelize; // Ensure this is exported
