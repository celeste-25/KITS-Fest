// Import Firebase Modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";

// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyCqT-JZP038sERBgoRaiqRmPkVGDUGYLPw",
    authDomain: "event-payment-30106.firebaseapp.com",
    databaseURL: "https://event-payment-30106-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "event-payment-30106",
    storageBucket: "event-payment-30106.appspot.com",
    messagingSenderId: "171503241159",
    appId: "1:171503241159:web:2347c107e65fb7a4003be2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);

// Form Elements
const paymentForm = document.getElementById("paymentForm");
const transactionIdInput = document.getElementById("transactionId");
const uploadImage = document.getElementById("uploadImage");
const submitBtn = document.getElementById("submitBtn");

// Enable submit button when all fields are filled
paymentForm.addEventListener("input", () => {
    submitBtn.disabled = !paymentForm.checkValidity();
});

// Handle Form Submission
paymentForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const year = document.getElementById("year").value;
    const branch = document.getElementById("branch").value;
    const eventType = document.getElementById("eventType").value;
    const transactionId = transactionIdInput.value;
    const file = uploadImage.files[0];

    if (!file) {
        alert("Please upload a valid image.");
        return;
    }

    // Upload Image to Firebase Storage
    const fileRef = storageRef(storage, `receipts/${transactionId}_${file.name}`);
    await uploadBytes(fileRef, file);
    const fileURL = await getDownloadURL(fileRef);

    // Push Payment Data to Firebase Database
    push(ref(database, "payments"), {
        name,
        year,
        branch,
        eventType,
        transactionId,
        receipt: fileURL,
        timestamp: new Date().toISOString()
    });

    alert("Payment Submitted Successfully!");
    paymentForm.reset();
    submitBtn.disabled = true;
});
