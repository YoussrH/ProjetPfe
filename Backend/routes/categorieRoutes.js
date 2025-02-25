










const express = require("express");
const router = express.Router();
const Category = require("../models/categoryModel");

// POST: Add a category (or subcategory)
router.post("/ajouterCategorie", async (req, res) => {
  try {
    const { name, parentId } = req.body;
    const category = await Category.create({ name, parentId: parentId || null });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error adding category", error });
  }
});


router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [
        { model: Category, as: "parentCategory", attributes: ["id", "name"] }, // Include parent
        { model: Category, as: "subcategories" } // Keep subcategories if needed
      ]
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving categories", error });
  }
});


// PUT: Update a category
router.put("/:id", async (req, res) => {
  try {
    const { name, parentId } = req.body;
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    await category.update({ name, parentId: parentId || null });
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Error updating category", error });
  }
});

// DELETE: Remove a category
router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    await category.destroy();
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error });
  }
});

module.exports = router;
