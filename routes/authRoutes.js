// authRoutes.js

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Define authentication routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.post("/google-login", authController.googleLogin);
router.post("/two-factor-auth", authController.twoFactorAuth);
router.get("/verify-token", authController.verifyToken, authController.getUser);
module.exports = router;
