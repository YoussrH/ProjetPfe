const express = require("express");
const router = express.Router();
const Marque = require("../models/marqueModel");

// ➤ Add a Marque
// ✅ POST: Add a new marque
router.post("/ajouterMarque", async (req, res) => {
  console.log("🔵 Received request at /ajouterMarque"); // Debugging log
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });

    const marque = await Marque.create({ name });
    res.status(201).json(marque);
  } catch (error) {
    console.error("❌ Error adding marque:", error);
    res.status(500).json({ message: "Error adding marque", error });
  }
});

// ➤ Get All Marques
router.get("/", async (req, res) => {
  try {
    const marques = await Marque.findAll();
    res.json(marques);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving marques", error });
  }
});

// ➤ Update a Marque
router.put("/:id", async (req, res) => {
  try {
    const { name } = req.body;
    const marque = await Marque.findByPk(req.params.id);
    if (!marque) return res.status(404).json({ message: "Marque not found" });

    await marque.update({ name });
    res.json(marque);
  } catch (error) {
    res.status(500).json({ message: "Error updating marque", error });
  }
});

// ➤ Delete a Marque
router.delete("/:id", async (req, res) => {
  try {
    const marque = await Marque.findByPk(req.params.id);
    if (!marque) return res.status(404).json({ message: "Marque not found" });

    await marque.destroy();
    res.json({ message: "Marque deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting marque", error });
  }
});
// ➤ Get a Marque by ID
router.get("/:id", async (req, res) => {
  try {
    const marque = await Marque.findByPk(req.params.id);
    if (!marque) {
      return res.status(404).json({ message: "Marque not found" });
    }
    res.json(marque);
  } catch (error) {
    console.error("Error fetching marque:", error);
    res.status(500).json({ message: "Error fetching marque", error });
  }
});


module.exports = router;
