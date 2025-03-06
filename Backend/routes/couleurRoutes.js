const express = require("express");
const router = express.Router();
const Couleur = require("../models/couleurModel"); // Import the Couleur model

// Route to add a new color
router.post("/Ajoutercouleurs", async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Le nom de la couleur est requis." });
    }

    try {
        const newColor = await Couleur.create({ name }); // Utilisation correcte de Sequelize
        res.json(newColor);
    } catch (error) {
        console.error("Erreur lors de l'ajout de la couleur:", error);
        res.status(500).json({ error: "Erreur serveur lors de l'ajout de la couleur." });
    }
});


// Fetch all couleurs
router.get("/", async (req, res) => {
  try {
    const couleurs = await Couleur.findAll();
    res.json(couleurs);
  } catch (error) {
    console.error("Error fetching colors:", error);
    res.status(500).json({ message: "Error fetching colors", error });
  }
});

module.exports = router;