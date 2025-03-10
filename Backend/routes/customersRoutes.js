const express = require("express");
const router = express.Router();
const Customer = require("../models/customerModel");
const User = require("../models/userModel");
router.post("/place-order", async (req, res) => {
    try {
      const { userId, telephone, adresse, orderDetails } = req.body;
  
      // Fetch the user
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      // Check if the user already has a customer record
      let customer = await Customer.findOne({ where: { userId } });
  
      // If no customer record exists, create one
      if (!customer) {
        customer = await Customer.create({
          userId,
          telephone,
          adresse,
          mesCommandes: JSON.stringify([orderDetails]), // Store the first order
          derniereConnexion: new Date(),
        });
      } else {
        // If a customer record exists, update it
        const orders = JSON.parse(customer.mesCommandes || "[]");
        orders.push(orderDetails);
        customer.mesCommandes = JSON.stringify(orders);
        customer.derniereConnexion = new Date();
        await customer.save();
      }
  
      res.status(201).json({
        message: "Order placed successfully.",
        customer,
      });
    } catch (error) {
      console.error("Error placing order:", error);
      res.status(500).json({ error: "Failed to place order." });
    }
  });