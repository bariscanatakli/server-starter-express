// passwordResetUtils.js

const crypto = require("crypto");
const db = require("../config/firebaseConfig"); // Import Firestore database instance
const nodemailer = require("nodemailer");

// Generate a random token using crypto module
function generateResetToken() {
  const token = crypto.randomBytes(32).toString("hex");
  return token;
}

async function saveResetToken(email, resetToken) {
  try {
    // Save the reset token to the database (e.g., Firestore) for the specified email
    await db.collection("passwordResetTokens").doc(email).set({
      token: resetToken,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error("Error saving reset token to database:", error);
    throw error;
  }
}

async function sendPasswordResetEmail(email, resetToken) {
  // Implement the logic to send the password reset email
  // You can use nodemailer or any other email sending library
  // Here's an example using nodemailer
  const transporter = nodemailer.createTransport({
    // Your email configuration
  });

  const mailOptions = {
    from: "your@example.com",
    to: email,
    subject: "Password Reset",
    html: `<p>You requested a password reset. Click <a href="http://yourwebsite.com/reset/${resetToken}">here</a> to reset your password.</p>`,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = {
  generateResetToken,
  saveResetToken,
  sendPasswordResetEmail,
};
