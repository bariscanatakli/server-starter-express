const userService = require("../services/userService");
const userUtils = require("../utils/userUtils");

exports.createUser = async (req, res) => {
  try {
    const userData = req.body;
    const { userId } = await userService.createUser(userData);
    res.status(201).json({ message: "User created successfully", userId });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await userService.getUserById(userId);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json(userUtils.sanitizeUserData(user));
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userData = req.body;
    await userService.updateUser(userId, userData);
    res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    await userService.deleteUser(userId);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Search for users
exports.searchUsers = async (req, res) => {
  try {
    const searchQuery = req.query.q; // Get search query from request
    const users = await userService.searchUsers(searchQuery);
    res.json(users.map(userUtils.sanitizeUserData));
  } catch (error) {
    console.error("Error searching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.userId; // Assuming userId is extracted from authentication
    const profileData = req.body; // Profile data to be updated
    await userService.updateProfile(userId, profileData);
    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Activate a user account
exports.activateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    await userService.activateUser(userId);
    res.json({ message: "User activated successfully" });
  } catch (error) {
    console.error("Error activating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Deactivate a user account
exports.deactivateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    await userService.deactivateUser(userId);
    res.json({ message: "User deactivated successfully" });
  } catch (error) {
    console.error("Error deactivating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Assign role to user
exports.assignRole = async (req, res) => {
  try {
    const { userId, role } = req.body;
    await userService.assignRole(userId, role);
    res.json({ message: "Role assigned successfully" });
  } catch (error) {
    console.error("Error assigning role to user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Change user password
exports.changePassword = async (req, res) => {
  try {
    const userId = req.userId; // Assuming userId is extracted from authentication
    const { currentPassword, newPassword } = req.body;
    await userService.changePassword(userId, currentPassword, newPassword);
    res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing user password:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Retrieve user authentication history
exports.getAuthHistory = async (req, res) => {
  try {
    const userId = req.userId; // Assuming userId is extracted from authentication
    const authHistory = await userService.getAuthHistory(userId);
    res.json(authHistory);
  } catch (error) {
    console.error("Error retrieving user authentication history:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Retrieve user activity log
exports.getActivityLog = async (req, res) => {
  try {
    const userId = req.userId; // Assuming userId is extracted from authentication
    const activityLog = await userService.getActivityLog(userId);
    res.json(activityLog);
  } catch (error) {
    console.error("Error retrieving user activity log:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Update user preferences
exports.updatePreferences = async (req, res) => {
  try {
    const userId = req.userId; // Assuming userId is extracted from authentication
    const preferences = req.body;
    await userService.updatePreferences(userId, preferences);
    res.json({ message: "Preferences updated successfully" });
  } catch (error) {
    console.error("Error updating user preferences:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Import user data
exports.importUserData = async (req, res) => {
  try {
    // Implement import user data functionality using userService
    // This could involve uploading a file with user data and processing it
    res.json({ message: "User data imported successfully" });
  } catch (error) {
    console.error("Error importing user data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Send email verification link
exports.sendEmailVerification = async (req, res) => {
  try {
    const userId = req.userId; // Assuming userId is extracted from authentication
    await userService.sendEmailVerification(userId);
    res.json({ message: "Email verification link sent successfully" });
  } catch (error) {
    console.error("Error sending email verification link:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Verify email using verification token
exports.verifyEmail = async (req, res) => {
  try {
    const token = req.params.token; // Token sent in the request
    await userService.verifyEmail(token);
    res.json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Send password reset link to user's email
exports.sendPasswordResetEmail = async (req, res) => {
  try {
    const email = req.body.email; // User's email
    await userService.sendPasswordResetEmail(email);
    res.json({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.error("Error sending password reset email:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Reset user password using reset token
exports.resetPassword = async (req, res) => {
  try {
    const token = req.params.token; // Token sent in the request
    const newPassword = req.body.newPassword; // New password
    await userService.resetPassword(token, newPassword);
    res.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Authenticate user with two-factor authentication
exports.twoFactorAuth = async (req, res) => {
  try {
    const userId = req.userId; // Assuming userId is extracted from authentication
    const { code } = req.body; // Two-factor authentication code
    const result = await userService.twoFactorAuth(userId, code);
    if (result) {
      res.json({ message: "Two-factor authentication successful" });
    } else {
      res.status(401).json({ error: "Invalid authentication code" });
    }
  } catch (error) {
    console.error("Error with two-factor authentication:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Export user data
exports.exportUserData = async (req, res) => {
  try {
    const userId = req.userId; // Assuming userId is extracted from authentication
    const userData = await userService.exportUserData(userId);
    // Format userData as needed, e.g., convert to CSV or JSON
    res.attachment("userData.json"); // Set appropriate content disposition
    res.json(userData);
  } catch (error) {
    console.error("Error exporting user data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
