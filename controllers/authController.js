// authController.js

const authService = require("../services/authService");
const authUtils = require("../utils/authUtils");
const passwordResetUtils = require("../utils/passwordResetUtils");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email is already registered
    const isRegistered = await authUtils.isEmailRegistered(email);
    if (isRegistered) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Register user
    await authService.registerUser(email, password);

    // Generate JWT token
    const token = authUtils.generateToken(email);

    res.status(201).json({ token });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Authenticate user
    const token = await authService.loginUser(email, password);
    if (!token) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.verifyToken = (req, res, next) => {
  // Get the token from the headers
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Check if the header format is correct
  const bearer = bearerHeader.split(" ");
  const token = bearer[1];

  if (bearer[0] !== "Bearer" || !token) {
    return res.status(401).json({ message: "Invalid token format" });
  }
  console.log(token);
  // Verify the token
  jwt.verify(token, "your-secret-key", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.email = decoded.email;
    next();
  });
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the email exists in the database
    const isRegistered = await authUtils.isEmailRegistered(email);
    if (!isRegistered) {
      return res.status(404).json({ message: "Email not found" });
    }

    // Generate a password reset token (you can use libraries like crypto to generate a unique token)
    const resetToken = passwordResetUtils.generateResetToken();

    // Save the reset token and its expiry date in the database (e.g., Firestore)
    await passwordResetUtils.saveResetToken(email, resetToken);

    // Send the password reset link to the user's email
    await passwordResetUtils.sendPasswordResetEmail(email, resetToken);

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    console.error("Error during password reset:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller method for Google login
exports.googleLogin = async (req, res) => {
  try {
    // Implement Google login logic here
    // This could involve authenticating the user with Google OAuth and creating a new user or logging in an existing user
    // Upon successful login, generate a JWT token and send it back to the client
    const { googleToken } = req.body;
    const user = await authService.authenticateWithGoogle(googleToken);
    if (!user) {
      return res.status(401).json({ message: "Google authentication failed" });
    }
    const token = authUtils.generateToken(user.email);
    res.json({ token });
  } catch (error) {
    console.error("Error with Google login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller method for two-factor authentication
exports.twoFactorAuth = async (req, res) => {
  try {
    const { userId, code } = req.body;
    const isVerified = await authService.verifyTwoFactorAuth(userId, code);
    if (isVerified) {
      // If two-factor authentication is successful, generate a JWT token and send it back to the client
      const token = authUtils.generateToken(userId);
      res.json({ token });
    } else {
      res.status(401).json({ error: "Invalid authentication code" });
    }
  } catch (error) {
    console.error("Error with two-factor authentication:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getUser = (req, res) => {
  const email = req.email;
  if (!email) {
    return res.status(400).json({ error: "Email is missing" });
  }
  res.status(200).json(email);
};
