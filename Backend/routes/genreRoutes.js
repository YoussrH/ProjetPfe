// routes/genreRoutes.js
const express = require("express");
const router = express.Router();
const Genre = require("../models/genreModel");

// ➤ Add a Genre
router.post("/ajouterGenre", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });

    const genre = await Genre.create({ name });
    res.status(201).json(genre);
  } catch (error) {
    console.error("Error adding genre:", error);
    res.status(500).json({ message: "Error adding genre", error });
  }
});

// ➤ Get All Genres
router.get("/", async (req, res) => {
  try {
    const genres = await Genre.findAll();
    res.json(genres);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving genres", error });
  }
});

// ➤ Update a Genre
router.put("/:id", async (req, res) => {
  try {
    const { name } = req.body;
    const genre = await Genre.findByPk(req.params.id);
    if (!genre) return res.status(404).json({ message: "Genre not found" });

    await genre.update({ name });
    res.json(genre);
  } catch (error) {
    res.status(500).json({ message: "Error updating genre", error });
  }
});

// ➤ Delete a Genre
router.delete("/:id", async (req, res) => {
  try {
    const genre = await Genre.findByPk(req.params.id);
    if (!genre) return res.status(404).json({ message: "Genre not found" });

    await genre.destroy();
    res.json({ message: "Genre deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting genre", error });
  }
});

module.exports = router;