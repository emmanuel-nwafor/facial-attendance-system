// Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Add Firestore
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHMkuQpKDov6SGgzRUynCtsBhghR9F-k0",
  authDomain: "facial-attendance-system-2b456.firebaseapp.com",
  projectId: "facial-attendance-system-2b456",
  storageBucket: "facial-attendance-system-2b456.appspot.com", // Fix typo here
  messagingSenderId: "689224308368",
  appId: "1:689224308368:web:f0be88ae58e1a3ac8c6a15",
  measurementId: "G-PWFM8BRP6J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);  // Initialize Firestore for data storage

// Initialize Authentication and Analytics
const auth = getAuth(app);  // Add authentication
const analytics = getAnalytics(app);

// Export the necessary modules
export { app, auth, db, analytics };
