document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const eventName = urlParams.get("event").toUpperCase().replace(/%20/g, " ");
    const eventField = document.getElementById("event");
    
    if (eventName) {
        eventField.value = eventName;
        let scriptSrc;

        if (eventName === "Poem Writing") {
            scriptSrc = "poem-writing-reg.js";
        } else if (eventName === "Essay Writing") {
            scriptSrc = "essay-writing-reg.js";
        } else if (eventName === "Story Writing") {
            scriptSrc = "story-writing-reg.js";
        } else if (eventName === "Pencil Drawing") {
            scriptSrc = "pencil-drawing-reg.js";
        } else if (eventName === "Cartoon Drawing") {
            scriptSrc = "cartoon-drawing-reg.js";
        } else if (eventName === "Face Painting") {
            scriptSrc = "face-painting-reg.js";
        }


        if (scriptSrc) {
            const existingScript = document.getElementById('eventScript');
            if (existingScript) {
                existingScript.remove();
            }
            
            const script = document.createElement('script');
            script.id = 'eventScript';
            script.src = scriptSrc;
            document.body.appendChild(script);
        }
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form[name='offlinePaymentForm']");
    const loadingOverlay = document.getElementById("loadingOverlay");
    const loadingBar = document.querySelector(".loadingBar");
    const submitButton = form.querySelector("input[type='submit']");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Stop default form submission

            // Check if loading elements exist
            if (!loadingOverlay || !loadingBar) {
                console.error("Loading elements not found.");
                return;
            }

            // Disable submit button to prevent multiple submissions
            submitButton.disabled = true;

            // Show loading overlay
            loadingOverlay.style.display = "flex";
            loadingBar.style.width = "0%"; // Reset loading bar

            // Start loading animation
            let progress = 0;
            const interval = setInterval(() => {
                progress = (progress + 10) % 100;
                loadingBar.style.width = progress + "%";
            }, 300);

            // Submit form via fetch()
            const formData = new FormData(form);
            fetch(form.action, { method: "POST", body: formData, mode: "no-cors" })
                .then(() => {
                    alert("Thank you! Your registration details are successfully submitted.");
                    clearInterval(interval);
                    form.reset();
                    submitButton.disabled = false;

                    // Hide loading overlay after clicking "OK" on the alert
                    setTimeout(() => {
                        loadingOverlay.style.display = "none";
                    }, 1000); // Wait 1 sec after alert
                })
                .catch(error => {
                    clearInterval(interval);
                    loadingOverlay.style.display = "none";
                    alert("There was an error submitting your form. Please try again later.");
                    console.error("Error!", error.message);
                    submitButton.disabled = false;
                });
        });

        // **Detect Google Sheets Pop-up and Hide Loading Bar After Clicking "OK"**
        function hideLoadingScreen() {
            loadingOverlay.style.display = "none";
            loadingBar.style.width = "0%";
        }

        // For Desktop: Detect focus when returning to the page
        window.addEventListener("focus", hideLoadingScreen);

        // For Mobile: Detect when the page becomes visible again
        document.addEventListener("visibilitychange", function () {
            if (!document.hidden) {
                hideLoadingScreen();
            }
        });
    }
});
