const checkbox = document.getElementById("agree-checkbox");
const registerButton = document.getElementById("register-button");
const card = document.getElementById("card");

let registrationUrl = "";

// Dynamically setting registration URL based on the page
if (window.location.pathname.includes('th.html')) {
    registrationUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfX8ovXyEv-CLf3BF6oXscR4zqYlV3Fu_mUHzD66BC_yHIqmg/viewform?usp=header";
} else if (window.location.pathname.includes('tg2.html')) {
    registrationUrl = "https://celeste-25.github.io/KITS-Fest/payment/payment.html";
} else if (window.location.pathname.includes('page2.html')) {
    registrationUrl = "https://link-for-page2.com";
} else {
    registrationUrl = "https://default-link.com";
}

// Enable register button only when checkbox is checked
checkbox.addEventListener("change", function () {
    registerButton.disabled = !this.checked;
});

// Redirect on register button click
registerButton.addEventListener("click", function () {
    window.location.href = registrationUrl;
});

// Flip Card Function
function flipCard() {
    card.classList.toggle('flipped');
}
