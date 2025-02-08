const checkbox = document.getElementById("agree-checkbox");
const registerButton = document.getElementById("register-button");
const card = document.getElementById("card");

let registrationUrl = "";

if (window.location.pathname.includes('th.html')) {
    registrationUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfX8ovXyEv-CLf3BF6oXscR4zqYlV3Fu_mUHzD66BC_yHIqmg/viewform?usp=header";
} else if (window.location.pathname.includes('toss-the-egg.html')) {
    registrationUrl = "https://celeste-25.github.io/KITS-Fest/payment/payment.html";
} else if (window.location.pathname.includes('page2.html')) {
    registrationUrl = "https://link-for-page2.com";
} else {
    registrationUrl = "https://default-link.com";
}

checkbox.addEventListener("change", function () {
    registerButton.disabled = !this.checked;
});

registerButton.addEventListener("click", function () {
    window.location.href = registrationUrl;
});

function flipCard() {
    card.classList.toggle('flipped');
}
