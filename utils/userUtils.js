// Exclude sensitive fields from user data
function sanitizeUserData(user) {
    const sanitizedUser = { ...user };
    delete sanitizedUser.password; // Remove password field
    return sanitizedUser;
  }
  
  module.exports = {
    sanitizeUserData,
  };
  