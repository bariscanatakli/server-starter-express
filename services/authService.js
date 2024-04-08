// authService.js
const { OAuth2Client } = require("google-auth-library");
const bcrypt = require("bcrypt");
const authUtils = require("../utils/authUtils");
// Initialize Google OAuth client
const googleClient = new OAuth2Client("your-client-id");

async function registerUser(email, password) {
  try {
    const isRegistered = await authUtils.isEmailRegistered(email);
    if (isRegistered) {
      throw new Error("Email is already registered");
    }
    const hashedPassword = await hashPassword(password);
    await authUtils.saveUserToDatabase(email, hashedPassword);
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
}

async function loginUser(email, password) {
  try {
    const hashedPassword = await authUtils.getPasswordByEmail(email);
    if (!hashedPassword) {
      throw new Error("Invalid email");
    }
    const passwordMatch = await comparePassword(password, hashedPassword);
    if (!passwordMatch) {
      throw new Error("Invalid password");
    }
    const token = authUtils.generateToken(email);
    return token;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}

async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

async function comparePassword(password, hashedPassword) {
  const passwordMatch = await bcrypt.compare(password, hashedPassword);
  return passwordMatch;
}
async function authenticateWithGoogle(googleToken) {
  try {
    // Verify the Google token
    const ticket = await googleClient.verifyIdToken({
      idToken: googleToken,
      audience: "your-client-id",
    });
    const payload = ticket.getPayload();

    // Extract user information from the payload (e.g., email)
    const email = payload.email;

    // Check if the user with the extracted email exists in your database
    // If user exists, return user data
    // If user does not exist, you may choose to create a new user account

    return { email }; // Return user data
  } catch (error) {
    console.error("Error authenticating with Google:", error);
    throw error;
  }
}
async function verifyTwoFactorAuth(userId, code) {
  try {
    // Retrieve the user's secret key for two-factor authentication from the database
    const secretKey = await getTwoFactorAuthSecretKey(userId);

    // Verify the provided code against the secret key
    const isVerified = verifyCodeUsingSecretKey(code, secretKey);

    return isVerified;
  } catch (error) {
    console.error("Error verifying two-factor authentication:", error);
    throw error;
  }
}
function getTwoFactorAuthSecretKey(userId) {
  // Retrieve the user's secret key for two-factor authentication from the database
  // Implementation depends on how you store the secret key for each user
  // For example, you might store it in the users collection/document in Firestore
  // Return the secret key
}

function verifyCodeUsingSecretKey(code, secretKey) {
  // Verify the provided code against the secret key using a library like 'speakeasy'
  // Return true if the code is valid, false otherwise
}
module.exports = {
  registerUser,
  loginUser,
  authenticateWithGoogle,
  verifyTwoFactorAuth,
};
