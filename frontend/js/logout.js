import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCgY5RBr9EY0Jp6gdD9HrjN-uoG1mz2v2Y",
    authDomain: "beyondlimits-d1213.firebaseapp.com",
    projectId: "beyondlimits-d1213",
    storageBucket: "beyondlimits-d1213.firebasestorage.app",
    messagingSenderId: "815468861396",
    appId: "1:815468861396:web:c55414ced8f37aa560e841",
    measurementId: "G-JSJTWSZNSK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);


// Check authentication state
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is logged in:", user.email);
        const loggedInUserId = localStorage.getItem("loggedInUserId");

        if (loggedInUserId) {
            const docRef = doc(db, "users", loggedInUserId);
            getDoc(docRef)
                .then((docSnap) => {
                    if (docSnap.exists()) {
                        const userData = docSnap.data();
                        document.getElementById("loggedUserFName").innerText = userData.firstName;
                        document.getElementById("loggedUserEmail").innerText = userData.email;
                        document.getElementById("loggedUserLName").innerText = userData.lastName;
                    } else {
                        console.log("No document found matching ID");
                    }
                })
                .catch((error) => {
                    console.error("Error getting document:", error);
                });
        } else {
            console.log("User ID not found in Local Storage");
        }
    } else {
        console.log("No user is logged in.");
    }
});

// Logout functionality
document.addEventListener("DOMContentLoaded", () => {
    const logoutButton = document.getElementById("logout");

    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            console.log("Attempting to sign out...");
            localStorage.removeItem("loggedInUserId");
            signOut(auth)
                .then(() => {
                    console.log("User signed out successfully.");
                    window.location.href = "/frontend/index.html";
                })
                .catch((error) => {
                    console.error("Error Signing out:", error);
                });
        });
    } else {
        console.error("Logout button not found!");
    }
});
