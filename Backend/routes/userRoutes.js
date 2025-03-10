const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

// Helper function to hash passwords
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users." });
  }
});

// Get a single user by ID
router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user." });
  }
});

// Update a user
/* router.put("/users/:id", async (req, res) => {
  try {
    const {
      prefix, // Include prefix field
      nom,
      prenom,
      email,
      password,
      newsletter,
      role,
      mesCommandes,
      mesRetours,
      mesCartesCadeau,
      maListeEnvies,
    } = req.body;

    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update fields
    user.prefix = prefix || user.prefix; // Update prefix field
    user.nom = nom || user.nom;
    user.prenom = prenom || user.prenom;
    user.email = email || user.email;
    user.newsletter = newsletter || user.newsletter;
    user.role = role || user.role;
    user.mesCommandes = mesCommandes || user.mesCommandes;
    user.mesRetours = mesRetours || user.mesRetours;
    user.mesCartesCadeau = mesCartesCadeau || user.mesCartesCadeau;
    user.maListeEnvies = maListeEnvies || user.maListeEnvies;

    // Hash password if provided
    if (password) {
      user.password = await hashPassword(password);
    }

    await user.save();
    res.status(200).json({ message: "User updated successfully.", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user." });
  }
}); */

/* router.put("/users/:id", async (req, res) => {
    try {
      const {
        prefixe,
        nom,
        prenom,
        email,
        password,
        newsletter,
        telephone,
        adresse,
        methodePaiement,
      } = req.body;
  
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      // Update User fields
      user.prefixe = prefixe || user.prefixe;
      user.nom = nom || user.nom;
      user.prenom = prenom || user.prenom;
      user.email = email || user.email;
      user.newsletter = newsletter || user.newsletter;
  
      // Hash password if provided
      if (password) {
        user.password = await bcrypt.hash(password, 10);
      }
  
      await user.save();
  
      // Update Customer fields (if customer exists)
      const customer = await Customer.findOne({ where: { userId: user.id } });
      if (customer) {
        customer.telephone = telephone || customer.telephone;
        customer.adresse = adresse || customer.adresse;
        customer.methodePaiement = methodePaiement || customer.methodePaiement;
        await customer.save();
      }
  
      res.status(200).json({ message: "Profile updated successfully.", user, customer });
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ error: "Failed to update profile." });
    }
  }); */

  router.put("/users/:id", async (req, res) => {
    try {
      console.log("Request Body:", req.body); // Log the incoming request body
      const {
        prefixe,
        nom,
        prenom,
        email,
        password,
        newsletter,
        telephone,
        adresse,
        methodePaiement,
      } = req.body;
  
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      // Log the user before updating
      console.log("User before update:", user);
  
      // Update User fields
      user.prefixe = prefixe || user.prefixe;
      user.nom = nom || user.nom;
      user.prenom = prenom || user.prenom;
      user.email = email || user.email;
      user.newsletter = newsletter || user.newsletter;
  
      // Hash password if provided
      if (password) {
        console.log("Hashing new password...");
        user.password = await bcrypt.hash(password, 10);
      }
  
      await user.save();
      console.log("User after update:", user);
  
      // Update Customer fields (if customer exists)
      const customer = await Customer.findOne({ where: { userId: user.id } });
      if (customer) {
        customer.telephone = telephone || customer.telephone;
        customer.adresse = adresse || customer.adresse;
        customer.methodePaiement = methodePaiement || customer.methodePaiement;
        await customer.save();
        console.log("Customer after update:", customer);
      }
  
      res.status(200).json({ message: "Profile updated successfully.", user, customer });
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ error: "Failed to update profile." });
    }
  });

  // Verify current password
router.post("/verify-password", async (req, res) => {
    try {
      const { currentPassword } = req.body;
  
      // Fetch the logged-in user from the session
      const userId = req.session.user?.id;
      if (!userId) {
        return res.status(401).json({ message: "Not authenticated. Please log in." });
      }
  
      // Fetch the user from the database
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      // Compare the current password with the stored password
      const isValid = await bcrypt.compare(currentPassword, user.password);
      if (!isValid) {
        return res.status(400).json({ isValid: false, message: "Incorrect current password." });
      }
  
      res.json({ isValid: true, message: "Password verification successful." });
    } catch (error) {
      console.error("Error verifying password:", error);
      res.status(500).json({ error: "Failed to verify password." });
    }
  });

// Delete a user
router.put("/users/:id", async (req, res) => {
    try {
      const {
        prefixe,
        nom,
        prenom,
        email,
        password,
        newsletter,
        telephone,
        adresse,
        methodePaiement,
      } = req.body;
  
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      // Update User fields
      user.prefixe = prefixe || user.prefixe;
      user.nom = nom || user.nom;
      user.prenom = prenom || user.prenom;
      user.email = email || user.email;
      user.newsletter = newsletter || user.newsletter;
  
      // Hash password if provided
      if (password) {
        user.password = await bcrypt.hash(password, 10);
      }
  
      await user.save();
  
      // Update Customer fields (if customer exists)
      const customer = await Customer.findOne({ where: { userId: user.id } });
      if (customer) {
        customer.telephone = telephone || customer.telephone;
        customer.adresse = adresse || customer.adresse;
        customer.methodePaiement = methodePaiement || customer.methodePaiement;
        await customer.save();
      }
  
      res.status(200).json({ message: "Profile updated successfully.", user, customer });
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ error: "Failed to update profile." });
    }
  });

module.exports = router;