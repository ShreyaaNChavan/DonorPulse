// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

// Firebase configuration

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCRsVrHpVCqig2iaZTaW1e5FzR_KX85uIY",
    authDomain: "blooddonation-bb7ae.firebaseapp.com",
    projectId: "blooddonation-bb7ae",
    storageBucket: "blooddonation-bb7ae.firebasestorage.app",
    messagingSenderId: "885536461650",
    appId: "1:885536461650:web:ca9df4c9f7b9aed509e08b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById("aadhar").addEventListener("blur", async function() {
    let aadhar = this.value.trim();
    if (aadhar.length === 12) {
        const donorRef = doc(db, "donors", aadhar);
        const donorSnap = await getDoc(donorRef);
        
        if (donorSnap.exists()) {
            let data = donorSnap.data();
            document.getElementById("name").value = data.name;
            document.getElementById("dob").value = data.dob;
            document.getElementById("mobile").value = data.mobile;
            document.getElementById("email").value = data.email;
            document.getElementById("address").value = data.address;
            document.getElementById("gender").value = data.gender;
            document.getElementById("height").value = data.height;
            document.getElementById("weight").value = data.weight;
            document.getElementById("bloodGroup").value = data.bloodGroup;
            document.getElementById("age").value = data.age;
            document.getElementById("bmi").value = data.bmi;
            document.getElementById("token").value = data.token;
            document.getElementById("tokenStatus").value = data.tokenStatus;
            alert("Existing donor details auto-filled.");
        } else {
            alert("New donor! Please enter all details.");
        }
    } else {
        alert("Enter a valid 12-digit Aadhar Number.");
    }
});


async function saveDonor() {
    let aadhar = document.getElementById("aadhar").value;
    let name = document.getElementById("name").value;
    let dob = document.getElementById("dob").value;
    let mobile = document.getElementById("mobile").value;
    let email = document.getElementById("email").value;
    let address = document.getElementById("address").value;
    let gender = document.getElementById("gender").value;
    let height = document.getElementById("height").value;
    let weight = document.getElementById("weight").value;
    let bloodGroup = document.getElementById("bloodGroup").value;
    let age = document.getElementById("age").value;
    let bmi = document.getElementById("bmi").value;
    let token = "TKN-" + Math.floor(1000 + Math.random() * 9000);
    let tokenStatus = "Token Given";
    let dateTime = new Date().toLocaleString();

    if (!aadhar || !name || !dob || !mobile || !email || !gender || !height || !weight || !bloodGroup || !age || !bmi) {
        alert("Please fill all fields!");
        return;
    }

    await setDoc(doc(db, "donors", aadhar), {
        name, dob, mobile, email, address, gender, height, weight, bloodGroup, age, bmi, token, tokenStatus, dateTime
    });

    alert("Donor Registered Successfully!");
}

async function checkRepeatDonation(aadhar) {
    const donorRef = doc(db, "donors", aadhar);
    const donorSnap = await getDoc(donorRef);

    if (donorSnap.exists()) {
        let lastDonation = donorSnap.data().dateTime;
        let gender = donorSnap.data().gender;
        let today = new Date();
        let lastDonationDate = new Date(lastDonation);
        let eligibleAfterDays = gender === "Male" ? 90 : 120;
        let nextEligibleDate = new Date(lastDonationDate);
        nextEligibleDate.setDate(lastDonationDate.getDate() + eligibleAfterDays);

        if (today < nextEligibleDate) {
            alert(`❌ You can donate after ${eligibleAfterDays} days on ${nextEligibleDate.toDateString()}`);
            return false;
        }
    }
    return true;
}
