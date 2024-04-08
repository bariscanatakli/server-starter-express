// authUtils.js

// Import necessary modules
const jwt = require("jsonwebtoken");
const db = require("../config/firebaseConfig"); // Import Firestore database instance

// Placeholder functions for Firestore interactions
async function isEmailRegistered(email) {
  // Check if the email is already registered in the database
  // Implementation might vary depending on your database structure
  // For Firestore, you would perform a query to check if the email exists in the users collection
  // Return true if the email is registered, false otherwise
  try {
    const userQuerySnapshot = await db
      .collection("users")
      .where("email", "==", email)
      .get();
    return !userQuerySnapshot.empty;
  } catch (error) {
    console.error("Error checking if email is registered:", error);
    throw error;
  }
}

async function getPasswordByEmail(email) {
  // Retrieve the hashed password associated with the provided email from the database
  // Implementation might vary depending on your database structure
  // For Firestore, you would perform a query to get the password from the users collection
  try {
    const userQuerySnapshot = await db
      .collection("users")
      .where("email", "==", email)
      .get();
    if (!userQuerySnapshot.empty) {
      // Assuming only one user with the provided email exists
      const userData = userQuerySnapshot.docs[0].data();
      return userData.password; // Return the hashed password
    } else {
      return null; // Return null if user not found
    }
  } catch (error) {
    console.error("Error getting password from database:", error);
    throw error;
  }
}

function generateToken(email) {
  // Generate a JWT token for the provided email
  // Implementation might vary depending on your token generation mechanism
  // Here, we'll use a simple example using the jsonwebtoken library
  const token = jwt.sign({ email }, "your-secret-key", { expiresIn: "1h" });
  return token;
}

// Export the utility functions
module.exports = {
  isEmailRegistered,
  getPasswordByEmail,
  generateToken,
};
