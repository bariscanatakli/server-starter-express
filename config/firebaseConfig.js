const admin = require('firebase-admin');

// Check if Firebase app is already initialized
if (!admin.apps.length) {
    // Initialize Firebase app
    const serviceAccount = require('./serviceAccount.json');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

// Export Firestore database instance
module.exports = admin.firestore();
