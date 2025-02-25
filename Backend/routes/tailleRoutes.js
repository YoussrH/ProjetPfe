const express = require("express");
const router = express.Router();
const Taille = require("../models/tailleModel");

// ➤ Add a Taille
router.post("/ajouterTaille", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });

    const taille = await Taille.create({ name });
    res.status(201).json(taille);
  } catch (error) {
    console.error("Error adding taille:", error);
    res.status(500).json({ message: "Error adding taille", error });
  }
});

// ➤ Get All Tailles
router.get("/", async (req, res) => {
  try {
    const tailles = await Taille.findAll();
    res.json(tailles);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving tailles", error });
  }
});

module.exports = router;
