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