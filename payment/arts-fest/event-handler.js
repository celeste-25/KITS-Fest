document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const eventName = urlParams.get("event").toUpperCase().replace(/%20/g, " ");
    const eventField = document.getElementById("event");
    
    if (eventName) {
        eventField.value = eventName;
        let scriptSrc;

        if (eventName === "SOLO SONG") {
            scriptSrc = "solo-song-reg.js";
        } else if (eventName === "SOLO DANCE") {
            scriptSrc = "solo-dance-reg.js";
        } else if (eventName === "SPOT CHOREOGRAPHY") {
            scriptSrc = "spot-choreography.js";
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
    const form = document.querySelector("form[name='groupEventForm']");
    const loadingOverlay = document.getElementById("loadingOverlay");
    const loadingBar = document.querySelector(".loadingBar");
    const submitButton = form.querySelector("input[type='submit']");

    if (form) {
        form.addEventListener("submit", function (event) {
            // Disable the submit button to prevent duplicate submissions
            submitButton.disabled = true;

            // Show loading screen
            loadingOverlay.style.display = "flex";
            loadingBar.style.width = "0%";

            // Start loading animation
            let progress = 0;
            const interval = setInterval(() => {
                progress = (progress + 10) % 100;
                loadingBar.style.width = progress + "%";
            }, 300);

            // Allow the form to submit naturally (Google Sheets will handle it)
        });

        // **Detect Google Sheets Pop-up and Hide Loading Bar After Clicking "OK"**
        window.addEventListener("focus", function () {
            // When user returns focus after clicking "OK" on Google Sheets pop-up, hide the loading bar
            loadingOverlay.style.display = "none"; // Hide loading screen
            loadingBar.style.width = "0%"; // Reset loading bar
        });
    }
});
