const express = require("express");
const router = express.Router();
const Article = require("../models/articleModel");
const cloudinary = require("../config/cloudinaryConfig");

// ➤ Add New Article
router.post("/", async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discount,
      stock,
      sku,
      images, // Make sure the request sends an array
      seoTitle,
      seoKeywords,
      categoryId,
      marqueId,
    } = req.body;

    if (!name || !price || !categoryId || !marqueId) {
      return res.status(400).json({ message: "Name, price, category, and marque are required!" });
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
    console.log("🔍 Debug: Article model:", Article);

    // Save Article with images as an array
    const article = await Article.create({
      name,
      description,
      price,
      discount,
      finalPrice,
      stock,
      sku,
      images: imageUrls, // Make sure this is an array
      seoTitle,
      seoKeywords,
      categoryId,
      marqueId,
    });

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
router.put("/:id", async (req, res) => {
  try {
    const { name, description, price, discount, stock, sku } = req.body;
    const article = await Article.findByPk(req.params.id);
    
    if (!article) return res.status(404).json({ message: "Article not found" });

    const finalPrice = price - (price * (discount || 0)) / 100;

    await article.update({ name, description, price, discount, finalPrice, stock, sku });

    res.json(article);
  } catch (error) {
    res.status(500).json({ message: "Error updating article", error });
  }
});

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
