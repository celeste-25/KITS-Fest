const checkbox = document.getElementById("agree-checkbox");
const registerButton = document.getElementById("register-button");

// Registration URL logic based on the current HTML file
let registrationUrl = "";

if (window.location.pathname.includes('th.html')) {
  registrationUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfX8ovXyEv-CLf3BF6oXscR4zqYlV3Fu_mUHzD66BC_yHIqmg/viewform?usp=header";
} else if (window.location.pathname.includes('page1.html')) {
  registrationUrl = "https://link-for-page1.com";
} else if (window.location.pathname.includes('page2.html')) {
  registrationUrl = "https://link-for-page2.com";
} else {
  registrationUrl = "https://default-link.com";
}

// Enable the register button when checkbox is checked
checkbox.addEventListener("change", function () {
  if (this.checked) {
    registerButton.disabled = false;
  } else {
    registerButton.disabled = true;
  }
});

// Redirect to the appropriate registration URL when the button is clicked
registerButton.addEventListener("click", function () {
  // Ensure it redirects to the registration URL instead of 'register.html'
  window.location.href = registrationUrl;
});
