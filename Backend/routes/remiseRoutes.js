const express = require("express");
const router = express.Router();
const Remise = require("../models/Remise");

// Create a new Remise (POST)
router.post("/Createremises", async (req, res) => {
  try {
    const remise = await Remise.create(req.body);
    res.status(201).json({
      message: "Remise créée avec succès",
      remise,
    });
  } catch (error) {
    console.error("Erreur lors de la création de la remise:", error);
    res.status(500).json({
      error: "Erreur lors de la création de la remise",
      details: error.message,
    });
  }
});

// Get all Remises (GET)
router.get("/Allremises", async (req, res) => {
  try {
    const remises = await Remise.findAll({
      include: ["Categorie", "Genre", "Taille"],
    });
    res.status(200).json(remises);
  } catch (error) {
    console.error("Erreur lors de la récupération des remises:", error);
    res.status(500).json({
      error: "Erreur lors de la récupération des remises",
      details: error.message,
    });
  }
});

// Get a Remise by ID (GET)
router.get("/remises/:id", async (req, res) => {
  try {
    const remise = await Remise.findByPk(req.params.id, {
      include: ["Categorie", "Genre", "Taille"],
    });
    if (!remise) {
      return res.status(404).json({ message: "Remise non trouvée" });
    }
    res.status(200).json(remise);
  } catch (error) {
    console.error("Erreur lors de la récupération de la remise:", error);
    res.status(500).json({
      error: "Erreur lors de la récupération de la remise",
      details: error.message,
    });
  }
});

// Update a Remise (PUT)
router.put("/remises/:id", async (req, res) => {
  try {
    const remise = await Remise.findByPk(req.params.id);
    if (!remise) {
      return res.status(404).json({ message: "Remise non trouvée" });
    }
    await remise.update(req.body);
    res.status(200).json({
      message: "Remise mise à jour avec succès",
      remise,
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la remise:", error);
    res.status(500).json({
      error: "Erreur lors de la mise à jour de la remise",
      details: error.message,
    });
  }
});

// Delete a Remise (DELETE)
router.delete("/remises/:id", async (req, res) => {
  try {
    const remise = await Remise.findByPk(req.params.id);
    if (!remise) {
      return res.status(404).json({ message: "Remise non trouvée" });
    }
    await remise.destroy();
    res.status(200).json({ message: "Remise supprimée avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de la remise:", error);
    res.status(500).json({
      error: "Erreur lors de la suppression de la remise",
      details: error.message,
    });
  }
});

// Apply Discount Logic
router.post("/apply-discount", async (req, res) => {
  try {
    const { type, price, quantity, customerPoints, promoCode, categoryId, genreId, tailleId } = req.body;

    let finalPrice = price;

    switch (type) {
      case "pourcentage":
        finalPrice = price - (price * req.body.valeur) / 100;
        break;
      case "montant_fixe":
        finalPrice = price - req.body.valeur;
        break;
      case "quantite":
        if (quantity >= req.body.quantite) {
          finalPrice = price - (price * req.body.valeur) / 100;
        }
        break;
      case "cumulatif":
        if (price >= req.body.montant_minimum && price <= req.body.montant_maximum) {
          finalPrice = price - (price * req.body.valeur) / 100;
        }
        break;
      case "code_promo":
        if (promoCode === req.body.code_promo) {
          finalPrice = price - (price * req.body.valeur) / 100;
        }
        break;
      case "fidelite":
        if (customerPoints > req.body.points_fidelite) {
          finalPrice = price - (price * req.body.valeur) / 100;
        }
        break;
      case "premier_achat":
        if (req.body.isFirstPurchase) {
          finalPrice = price - req.body.valeur;
        }
        break;
      case "deuxieme_article_moitie_prix":
        // Logic for second item at half price
        break;
      case "bogo":
        // Logic for buy X get Y free
        break;
      case "taille":
        if (tailleId === req.body.taille_id) {
          finalPrice = price - (price * req.body.valeur) / 100;
        }
        break;
      case "categorie":
        if (categoryId === req.body.categorie_id) {
          finalPrice = price - (price * req.body.valeur) / 100;
        }
        break;
      case "genre":
        if (genreId === req.body.genre_id) {
          finalPrice = price - (price * req.body.valeur) / 100;
        }
        break;
      case "categorie_genre":
        if (categoryId === req.body.categorie_id && genreId === req.body.genre_id) {
          finalPrice = price - (price * req.body.valeur) / 100;
        }
        break;
      case "categorie_genre_taille":
        if (categoryId === req.body.categorie_id && genreId === req.body.genre_id && tailleId === req.body.taille_id) {
          finalPrice = price - (price * req.body.valeur) / 100;
        }
        break;
      default:
        break;
    }

    res.status(200).json({ finalPrice });
  } catch (error) {
    console.error("Erreur lors de l'application de la remise:", error);
    res.status(500).json({
      error: "Erreur lors de l'application de la remise",
      details: error.message,
    });
  }
});

module.exports = router;