const express = require("express");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const User = require("../models/userModel");
const Customer = require("../models/customerModel");
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

// Middleware to ensure the user is authenticated
function ensureAuthenticated(req, res, next) {
  if (req.session.user) {
    return next(); // User is authenticated, proceed to the next middleware/route
  }
  res.status(401).json({ message: "Not authenticated. Please log in." }); // User is not authenticated
}

// Protected route to get all user information
router.get("/protected", ensureAuthenticated, (req, res) => {
  const user = req.session.user; // Retrieve the entire user object from the session

  if (!user) {
    return res.status(404).json({ message: "User not found in session. Please log in again." });
  }

  // Return all user information
  res.json({
    message: "This is a protected route",
    user: user, // Return the entire user object
  });
});

// Register User
router.post("/register", async (req, res) => {
  console.log("Request Body:", req.body); // Log the incoming request
  try {
    const { prefix, nom, prenom, email, password, newsletter } = req.body;

    // Validate required fields
    if (!prefix || !nom || !prenom || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists. Please use a different email." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Generate OTP and set expiration time (10 minutes)
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60000); // 10 minutes

    // Create user with OTP, newsletter preference, and prefix
    const user = await User.create({
      prefix, // Include prefix field
      nom,
      prenom,
      email,
      password: hashedPassword,
      otp,
      otpExpires,
      newsletter, // Include newsletter field
    });

    // Store the user object in the session
    req.session.user = user;

    // Send OTP to user's email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify Your Email",
      html: renderTemplate(nom, otp),
      text: `Your OTP is: ${otp}. It will expire in 10 minutes.`,
    });

    res.status(201).json({
      message: "Registration successful. You are now logged in.",
      user,
    });
  } catch (err) {
    console.error("Registration Error:", err); // Log the error
    res.status(500).json({ error: "Registration failed. Please try again later." });
  }
});

// Verify OTP
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Find the user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found. Please register first." });
    }

    // Check if OTP matches and is not expired
    if (user.otp !== otp || user.otpExpires < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP. Please request a new OTP." });
    }

    // Mark user as verified
    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    // Store the entire user object in the session (if not already stored)
    req.session.user = user; // Store all user data in the session

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
      message: "OTP verified successfully. You are now logged in.",
      user, // Return the entire user object to the frontend
    });
  } catch (err) {
    console.error("OTP Verification Error:", err); // Log the error
    res.status(500).json({ error: "OTP verification failed. Please try again." });
  }
});

// Login User
router.post("/login", async (req, res) => {
  try {
    console.log("Login Request Body:", req.body); // Log the request body

    // Check if the user is already logged in
    if (req.session.user) {
      console.log("User is already logged in:", req.session.user);
      return res.status(403).json({ message: "You are already logged in. Please log out first." });
    }

    const { email, password } = req.body;

    // Validate request body
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    // Find the user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found. Please register first." });
    }

    // Debug: Log the password and hashed password
    console.log("Provided Password:", password);
    console.log("Hashed Password from DB:", user.password);

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials. Please check your email and password." });
    }

    // Check if user is verified
    if (!user.isVerified) {
      console.log("User not verified:", user.email);
      return res.status(403).json({ message: "Account not verified. Please verify your email first." });
    }

    // Fetch customer data
    const customer = await Customer.findOne({ where: { userId: user.id } });
    console.log("Fetched Customer:", customer); // Log the fetched customer

    // Store the user object in the session
    req.session.user = user;
    console.log("Session User:", req.session.user); // Log the session user

    res.json({
      message: "Login successful",
      user,
      customer,
    });
  } catch (err) {
    console.error("Login Route Error:", err); // Log the error
    res.status(500).json({ error: "Login failed. Please try again later." });
  }
});

// Logout User
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err); // Log the error
      return res.status(500).json({ error: "Failed to logout. Please try again." });
    }
    res.clearCookie("connect.sid"); // Clear the session cookie
    console.log("Session destroyed and cookie cleared"); // Log success
    res.json({ message: "Logout successful" });
  });
});

// Get User Data
router.get("/user", ensureAuthenticated, async (req, res) => {
  try {
    const userId = req.session.user?.id;
    console.log("Session User ID:", userId); // Log the session user ID
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated. Please log in." });
    }

    // Fetch the user
    const user = await User.findByPk(userId);
    console.log("Fetched User:", user); // Log the fetched user
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Fetch the customer (if exists)
    const customer = await Customer.findOne({ where: { userId } }) || null;
    console.log("Fetched Customer:", customer); // Log the fetched customer

    res.json({
      user,
      customer,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ 
      error: "Failed to fetch user data.", 
      details: error.message 
    });
  }
});

module.exports = router;