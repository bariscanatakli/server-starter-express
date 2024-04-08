const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

// Create a new user
router.post("/", authController.verifyToken, userController.createUser);

// Get a user by ID
router.get("/:userId", authController.verifyToken, userController.getUserById);

// Update a user by ID
router.put("/:userId", authController.verifyToken, userController.updateUser);

// Delete a user by ID
router.delete("/:userId", authController.verifyToken, userController.deleteUser);

// Search for users
router.get("/search", authController.verifyToken, userController.searchUsers);

// Update user profile
router.put("/profile", authController.verifyToken, userController.updateProfile);

// Activate a user account
router.put("/:userId/activate", authController.verifyToken, userController.activateUser);

// Deactivate a user account
router.put("/:userId/deactivate", authController.verifyToken, userController.deactivateUser);

// Assign role to user
router.put("/:userId/assign-role", authController.verifyToken, userController.assignRole);

// Change user password
router.put("/:userId/change-password", authController.verifyToken, userController.changePassword);

// Retrieve user authentication history
router.get("/:userId/auth-history", authController.verifyToken, userController.getAuthHistory);

// Retrieve user activity log
router.get("/:userId/activity-log", authController.verifyToken, userController.getActivityLog);

// Update user preferences
router.put("/:userId/preferences", authController.verifyToken, userController.updatePreferences);

// Export user data
router.get("/:userId/export-data", authController.verifyToken, userController.exportUserData);

module.exports = router;
