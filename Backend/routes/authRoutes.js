const express = require("express");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const User = require("../models/userModel");
require("dotenv").config();

const router = express.Router();

// Generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Load the HTML templates
const otpEmailTemplate = fs.readFileSync(
  path.join(__dirname, "../templates/otpEmailTemplate.html"),
  "utf8"
);

const welcomeEmailTemplate = fs.readFileSync(
  path.join(__dirname, "../templates/welcomeEmailTemplate.html"),
  "utf8"
);

// Replace placeholders with actual data
const renderTemplate = (name, otp) => {
  return otpEmailTemplate
    .replace("{{name}}", name)
    .replace("{{otp}}", otp);
};

const renderWelcomeTemplate = (name, loginLink) => {
  return welcomeEmailTemplate
    .replace("{{name}}", name)
    .replace("{{loginLink}}", loginLink);
};

// Email Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
function ensureAuthenticated(req, res, next) {
  if (req.session.userId) {
    return next();
  }
  res.status(401).json({ message: "Not authenticated" });
}

// Example of a protected route
router.get("/protected", ensureAuthenticated, (req, res) => {
  // Retrieve user credentials from the session
  const userId = req.session.userId;
  const userPrenom = req.session.userPrenom;
  const userEmail = req.session.userEmail;

  res.json({
    message: "This is a protected route",
    user: {
      id: userId,
      prenom: userPrenom,
      email: userEmail,
    },
  });
});
// Register User
router.post("/register", async (req, res) => {
  try {
    const { nom, prenom, email, password, newsletter } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP and set expiration time (10 minutes)
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60000); // 10 minutes

    // Create user with OTP and newsletter preference
    const user = await User.create({
      nom,
      prenom,
      email,
      password: hashedPassword,
      otp,
      otpExpires,
      newsletter, // Include newsletter field
    });

    // Send OTP to user's email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify Your Email",
      html: renderTemplate(nom, otp), // Customized HTML email
      text: `Your OTP is: ${otp}. It will expire in 10 minutes.`, // Plain text fallback
    });

    res.status(201).json({ message: "OTP sent to your email. Please verify." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Verify OTP
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Find the user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if OTP matches and is not expired
    if (user.otp !== otp || user.otpExpires < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Mark user as verified
    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    // Create a session for the user
    req.session.userId = user.id; // Store user ID in the session
    req.session.userPrenom = user.prenom; // Store user's first name in the session
    req.session.userEmail = user.email; // Store user's email in the session

    // Send welcome email
    const loginLink = "http://localhost:3000/"; // Replace with your actual login link
    const emailContent = renderWelcomeTemplate(user.nom, loginLink);

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to MGM NEGOCE Sarl!",
      html: emailContent,
      text: `Hello ${user.nom},\n\nWelcome to MGM NEGOCE Sarl! Your registration was successful. Log in to your account here: ${loginLink}`,
    });

    res.json({
      message: "OTP vérifié avec succès. Vous êtes maintenant connecté.",
      user: { id: user.id, prenom: user.prenom, email: user.email }, // Return user data to the frontend
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Other routes (login, logout, etc.) remain unchanged
// Login User
router.post("/login", async (req, res) => {
  try {
    // Check if the user is already logged in
    if (req.session.userId) {
      return res.status(403).json({ message: "You are already logged in." });
    }

    const { email, password } = req.body;

    // Find the user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if user is verified
    if (!user.isVerified) {
      return res.status(403).json({ message: "Account not verified" });
    }

    // Store user data in session
    req.session.userId = user.id; // Store user ID
    req.session.userPrenom = user.prenom; // Store user's first name
    req.session.userEmail = user.email; // Store user's email

    res.json({ message: "Login successful", user: { id: user.id, prenom: user.prenom } });
  } catch (err) {
    console.error("Login Route Error:", err); // Log the error on the backend
    res.status(500).json({ error: err.message });
  }
});
// Logout User
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to logout" });
    }
    res.clearCookie("connect.sid"); // Clear the session cookie
    res.json({ message: "Logout successful" });
  });
});
// Fetch User Data
router.get("/user", ensureAuthenticated, (req, res) => {
  // Retrieve user credentials from the session
  const userId = req.session.userId;
  const userPrenom = req.session.userPrenom;
  const userEmail = req.session.userEmail;

  res.json({
    user: {
      id: userId,
      prenom: userPrenom,
      email: userEmail,
    },
  });
});
module.exports = router;