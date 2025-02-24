const express = require("express");
const router = express.Router();
const Marque = require("../models/marqueModel");

// ➤ Ajouter une marque
router.post("/addMarque", async (req, res) => {
  try {
    const { name } = req.body;
    const marque = await Marque.create({ name });
    res.status(201).json(marque);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'ajout de la marque", error });
  }
});

// ➤ Obtenir toutes les marques
router.get("/", async (req, res) => {
  try {
    const marques = await Marque.findAll();
    console.log(marques);  // Log the array of results
    res.json(marques);
  } catch (error) {
    console.error('Error fetching marques:', error);  // Log any errors
    res.status(500).json({ message: "Erreur lors de la récupération des marques", error });
  }
});



// ➤ Modifier une marque
router.put("/:id", async (req, res) => {
  try {
    const { name } = req.body;
    const marque = await Marque.findByPk(req.params.id);
    if (!marque) return res.status(404).json({ message: "Marque non trouvée" });

    await marque.update({ name });
    res.json(marque);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de la marque", error });
  }
});

// ➤ Supprimer une marque
router.delete("/:id", async (req, res) => {
  try {
    const marque = await Marque.findByPk(req.params.id);
    if (!marque) return res.status(404).json({ message: "Marque non trouvée" });

    await marque.destroy();
    res.json({ message: "Marque supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de la marque", error });
  }
});

module.exports = router;
