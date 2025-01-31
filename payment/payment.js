// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCqTJZPO38sERBgoRaimqRppKVDGUGYlPw",
  authDomain: "event-payment-30106.firebaseapp.com",
  databaseURL: "https://event-payment-30106-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "event-payment-30106",
  storageBucket: "event-payment-30106.firebasestorage.app",
  messagingSenderId: "171503241159",
  appId: "1:171503241159:web:2347c107e65fb7a4003be2"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const storage = firebase.storage();

document.getElementById("paymentForm").addEventListener("submit", function (e) {
    e.preventDefault();

    console.log("Submitting data to Firebase...");

    let formData = new FormData(this);
    let data = {};

    formData.forEach((value, key) => { 
        data[key] = value;
    });

    console.log("Form Data:", data);

    // Store the form data in Firebase DB
    const paymentRef = database.ref('payments').push();  // Adds a new entry
    paymentRef.set({
        name: data.name,
        year: data.year,
        branch: data.branch,
        eventType: data.eventType,
        transactionId: data.transactionId,
    })
    .then(() => {
        console.log("Data saved to Firebase!");
    })
    .catch((error) => {
        console.error("Error saving data to Firebase:", error);
    });

    // Handle image upload to Firebase Storage
    const fileInput = document.getElementById('uploadImage');
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const storageRef = storage.ref('uploads/' + file.name);
        
        storageRef.put(file).then(() => {
            console.log('File uploaded successfully to Firebase Storage');
        })
        .catch((error) => {
            console.error("Error uploading file:", error);
        });
    }

    // Success message
    alert("Payment details submitted successfully!"); 
});
