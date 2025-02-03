// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";

// Firebase configuration
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
const recordsRef = ref(database, "registrations");

// Form submission
document.getElementById("paymentForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const year = document.getElementById("year").value;
  const branch = document.getElementById("branch").value;
  const eventType = document.getElementById("eventType").value;
  const transactionId = document.getElementById("transactionId").value;

  // Store data in Firebase
  push(recordsRef, {
    name,
    year,
    branch,
    eventType,
    transactionId,
    timestamp: new Date().toISOString()
  });

  alert("Registration submitted successfully!");
  document.getElementById("paymentForm").reset();
});



  if (data) {
    Object.values(data).forEach(record => {
      const listItem = document.createElement("li");
      listItem.textContent = `${record.name} (${record.year}, ${record.branch}) registered for ${record.eventType} - TXN: ${record.transactionId}`;
      recordsList.appendChild(listItem);
    });
  }
});
