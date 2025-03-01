const express = require("express");
const router = express.Router();
const Taille = require("../models/tailleModel");
const Category = require("../models/categoryModel");
const Genre = require("../models/genreModel");

router.post("/ajouterTaille", async (req, res) => {
  try {
    const { name, category_id, genre_id } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });

    const taille = await Taille.create({ name, category_id, genre_id });

    res.status(201).json(taille);
  } catch (error) {
    console.error("Error adding taille:", error);
    res.status(500).json({ message: "Error adding taille", error });
  }
});

// Get All Tailles (Filtered by Genre and Category)
router.get("/", async (req, res) => {
  try {
    const { category_id, genre_id } = req.query;

    console.log("Received Query Params:", { category_id, genre_id });

    let whereCondition = {};
    if (category_id) whereCondition.category_id = category_id; // Remove parseInt if they are stored as strings in DB
    if (genre_id) whereCondition.genre_id = genre_id;

    const tailles = await Taille.findAll({ where: whereCondition });
    
    console.log("Fetched tailles:", tailles); // Debugging output
    
    res.json(tailles);
  } catch (error) {
    console.error("Error retrieving tailles:", error);
    res.status(500).json({ message: "Error retrieving tailles", error });
  }
});


module.exports = router;