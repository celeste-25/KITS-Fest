// Import Firebase modules from version 11.2.0
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

// New Firebase configuration for the new project
const firebaseConfig = {
  apiKey: "AIzaSyD9KhodYSPnxCvRfOkRhxstCEQsxWXj9dY",  // New API Key
  authDomain: "event-payment-76894.firebaseapp.com",  // New Auth Domain
  databaseURL: "https://event-payment-76894-default-rtdb.asia-southeast1.firebasedatabase.app",  // New DB URL
  projectId: "event-payment-76894",  // New Project ID
  storageBucket: "event-payment-76894.firebasestorage.app",  // New Storage Bucket
  messagingSenderId: "662934680496",  // New Messaging Sender ID
  appId: "1:662934680496:web:5b834df99d41ab937b5c75"  // New App ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const recordsRef = ref(database, "registrations");

// Form submission
document.getElementById("paymentForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const year = document.getElementById("year").value;
  const branch = document.getElementById("branch").value;
  const eventType = document.getElementById("eventType").value;
  const transactionId = document.getElementById("transactionId").value;
  const subCategory = document.getElementById("subCategory").value;
  const selectedEvents = Array.from(document.getElementById("events").selectedOptions).map(option => option.value);

  // Store data in Firebase
  push(recordsRef, {
    name,
    year,
    branch,
    eventType,
    transactionId,
    subCategory,
    selectedEvents,
    timestamp: new Date().toISOString()  // Add timestamp for the record
  });

  alert("Registration submitted successfully!");
  document.getElementById("paymentForm").reset();
});

// Fetch and display the registration data from Firebase
onValue(recordsRef, (snapshot) => {
  const data = snapshot.val();
  const recordsList = document.getElementById("recordsList");
  recordsList.innerHTML = "";  // Clear previous entries

  if (data) {
    Object.values(data).forEach(record => {
      const listItem = document.createElement("li");
      listItem.textContent = `${record.name} (${record.year}, ${record.branch}) registered for ${record.eventType} - TXN: ${record.transactionId}`;
      recordsList.appendChild(listItem);
    });
  }
});
