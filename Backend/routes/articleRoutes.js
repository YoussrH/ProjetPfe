const express = require("express");
const router = express.Router();
const Article = require("../models/articleModel");
const cloudinary = require("../config/cloudinaryConfig");
const Couleur = require("../models/couleurModel"); // Import the Couleur model

// ➤ Add New Article
/* router.post("/ajouterArticle", async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discount,
      stock,
      sku,
      images,
      seoTitle,
      seoKeywords,
      categoryId,
      marqueId,
      genreId,
      tailles, // Array of taille IDs
      couleurs, 
      conseils
    } = req.body;

    if (!name || !price || !categoryId || !marqueId || !genreId || !tailles) {
      return res.status(400).json({ message: "Name, price, category, marque, genre, and tailles are required!" });
    }

    // Ensure images is an array before processing
    const imageUrls = [];
    if (Array.isArray(images) && images.length > 0) {
      for (const image of images) {
        const uploadedImage = await cloudinary.uploader.upload(image, {
          folder: "articles",
        });
        imageUrls.push(uploadedImage.secure_url);
      }
    }

    // Calculate final price
    const finalPrice = price - (price * (discount || 0)) / 100;

    // Save Article with images as an array
    const article = await Article.create({
      name,
      description,
      price,
      discount,
      finalPrice,
      stock,
      sku,
      images: imageUrls,
      seoTitle,
      seoKeywords,
      categoryId,
      marqueId,
      genreId,
      conseils,
      tailles: tailles.map(id => parseInt(id)), // Store tailles as an array of IDs
    });
     // Associate colors with the article
    if (Array.isArray(couleurs) && couleurs.length > 0) {
      const colorInstances = await Couleur.findAll({
        where: { id: couleurs }, // Find colors by their IDs
      });
      await article.setCouleurs(colorInstances); // Associate colors with the article
    }

    res.status(201).json(article);
  } catch (error) {
    console.error("Error adding article:", error);
    res.status(500).json({ message: "Error adding article", error });
  }
}); */


// ➤ Add New Article
router.post("/ajouterArticle", async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discount,
      stock,
      sku,
      images,
      seoTitle,
      seoKeywords,
      categoryId,
      marqueId,
      genreId,
      tailles, // Array of taille IDs
      couleurs, // Array of couleur IDs
      conseils,
    } = req.body;

    if (!name || !price || !categoryId || !marqueId || !genreId || !tailles) {
      return res.status(400).json({ message: "Name, price, category, marque, genre, and tailles are required!" });
    }

    // Ensure images is an array before processing
    const imageUrls = [];
    if (Array.isArray(images) && images.length > 0) {
      for (const image of images) {
        const uploadedImage = await cloudinary.uploader.upload(image, {
          folder: "articles",
        });
        imageUrls.push(uploadedImage.secure_url);
      }
    }

    // Calculate final price
    const finalPrice = price - (price * (discount || 0)) / 100;

    // Save Article with images as an array
    const article = await Article.create({
      name,
      description,
      price,
      discount,
      finalPrice,
      stock,
      sku,
      images: imageUrls,
      seoTitle,
      seoKeywords,
      categoryId,
      marqueId,
      genreId,
      conseils,
      tailles: tailles.map((id) => parseInt(id)), // Store tailles as an array of IDs
    });

    // Associate colors with the article
    if (Array.isArray(couleurs) && couleurs.length > 0) {
      const colorInstances = await Couleur.findAll({
        where: { id: couleurs }, // Find colors by their IDs
      });
      await article.setCouleurs(colorInstances); // Associate colors with the article
    }

    res.status(201).json(article);
  } catch (error) {
    console.error("Error adding article:", error);
    res.status(500).json({ message: "Error adding article", error });
  }
});

// ➤ Get All Articles
router.get("/", async (req, res) => {
  try {
    const articles = await Article.findAll();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving articles", error });
  }
});

// ➤ Update Article
// Update an article
router.put("/:id", async (req, res) => {
  try {
    const { 
      name, description, price, discount, stock, sku, genreId, categoryId, 
      marqueId, tailles, couleurs, conseils // Added conseils field
    } = req.body;

    if (!name || !price || !stock || !genreId || !categoryId || !marqueId || !tailles) {
      return res.status(400).json({ message: "Tous les champs obligatoires sont requis !" });
    }

    const article = await Article.findByPk(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article non trouvé" });
    }

    const finalPrice = price - (price * (discount || 0)) / 100;

    await article.update({
      name, description, price, discount, finalPrice, stock, sku, genreId, 
      categoryId, marqueId, conseils, // Updated article with conseils
      tailles: tailles.map(id => parseInt(id))
    });

    // Update article colors
    if (Array.isArray(couleurs) && couleurs.length > 0) {
      const colorInstances = await Couleur.findAll({
        where: { name: couleurs },
      });
      await article.setCouleurs(colorInstances);
    }

    res.json(article);
  } catch (error) {
    console.error("Error updating article:", error);
    res.status(500).json({ message: "Erreur lors de la modification de l'article", error });
  }
});

// ➤ Get Article by ID



// ➤ Delete Article
router.delete("/:id", async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });

    await article.destroy();
    res.json({ message: "Article deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting article", error });
  }
});

module.exports = router;



