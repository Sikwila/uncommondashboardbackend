const admin = require('firebase-admin');
const auth = admin.auth();
const db = admin.firestore(); // Initialize Firestore

// Sign-up function
const signUp = async (name, email, password, role) => {
    try {
        const userRecord = await auth.createUser({
            email,
            password,
            displayName: name,
        });

        // Add custom claims for roles 
        await auth.setCustomUserClaims(userRecord.uid, { role });

        // Save user information in Firestore
        await db.collection('users').doc(userRecord.uid).set({
            name,
            email,
            role,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        return userRecord.uid;
    } catch (error) {
        throw new Error(`Sign-up error: ${error.message}`);
    }
};

// Export necessary functions
module.exports = { signUp };
