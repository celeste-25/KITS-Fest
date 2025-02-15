// Get event name from URL
const urlParams = new URLSearchParams(window.location.search);
const eventName = urlParams.get("event");
const eventTitle = document.getElementById("eventTitle");

// Set event name as the heading
if (eventName) {
    eventTitle.innerText = `Event: ${eventName}`;
}

// Buttons
const payOnlineBtn = document.getElementById("payOnlineBtn");
const payOfflineBtn = document.getElementById("payOfflineBtn");

// Redirect to appropriate pages with event name
payOnlineBtn.addEventListener("click", () => {
    window.location.href = `https://celeste-25.github.io/KITS-Fest/payment/online-payment.html?event=${eventName}`;
});

payOfflineBtn.addEventListener("click", () => {
    window.location.href = `https://celeste-25.github.io/KITS-Fest/payment/offline&no-payment.html?event=${eventName}`;
});
