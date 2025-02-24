document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const eventName = urlParams.get("event").toUpperCase().replace(/%20/g, " ");
    const eventField = document.getElementById("event");
    
    if (eventName) {
        eventField.value = eventName;
        let scriptSrc;

        switch (eventName) {
            case "GROUP SONG":
                scriptSrc = "grp-song-reg.js";
                break;
            case "GROUP DANCE":
                scriptSrc = "grp-dance-reg.js";
                break;
            case "MR. & MRS.":
                scriptSrc = "mr-mrs-reg.js";
                break;
            case "FILM SCENE RECREATION":
                scriptSrc = "film-reg.js";
                break;
            case "FASHION SHOW":
                scriptSrc = "f-show-reg.js";
                break;
            default:
                scriptSrc = "";
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
            // Disable submit button permanently to prevent duplicate submissions
            submitButton.disabled = true;

            // Show loading box
            loadingOverlay.style.display = "flex";
            loadingBar.style.width = "0%"; // Reset loading bar

            // Start infinite loading animation
            let progress = 0;
            const interval = setInterval(() => {
                progress = (progress + 10) % 100; // Looping animation
                loadingBar.style.width = progress + "%";
            }, 300);

            // Allow the form to submit naturally (removing fetch() to prevent double submission)
            setTimeout(() => {
                clearInterval(interval); // Stop loading animation
                loadingOverlay.style.display = "none"; // Hide loading screen after 1 second
                loadingBar.style.width = "0%"; // Reset loading bar
            }, 1000); // Hide after 1 second (after Google Sheets pop-up appears)
        });
    }
});

