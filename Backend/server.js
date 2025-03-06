const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

// Import Routes
const articleRoutes = require("./routes/articleRoutes");
const categorieRoutes = require("./routes/categorieRoutes");
const marqueRoutes = require("./routes/marqueRoutes"); // ✅ Make sure this is correct
const genreRoutes = require("./routes/genreRoutes"); // ✅ Make sure this is correct
const tailleRoutes = require("./routes/tailleRoutes");
const couleursRouter = require("./routes/couleurRoutes");

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route Setup
app.use("/api/articles", articleRoutes);
app.use("/api/categories", categorieRoutes);
app.use("/api/marques", marqueRoutes); // ✅ Ensure this is correct
app.use("/api/genres", genreRoutes); // ✅ Ensure this is correct
app.use("/api/tailles", tailleRoutes);
app.use("/api/couleurs", couleursRouter);
const PORT = process.env.PORT || 5000;
const sequelize = require("./config/database");

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("✅ Database synced!");
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error("❌ Error syncing database:", err));
