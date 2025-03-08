const express = require("express");
const nodemailer = require("nodemailer");
const User = require("../models/userModel");
require("dotenv").config();

const router = express.Router();

// Generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Email Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Approve User Registration


module.exports = router;