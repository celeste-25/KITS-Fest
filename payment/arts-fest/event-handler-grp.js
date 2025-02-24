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

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Stop default form submission

            // Show loading box
            loadingOverlay.style.display = "flex";
            loadingBar.style.width = "0%"; // Reset loading bar

            // Start infinite loading animation
            let progress = 0;
            const interval = setInterval(() => {
                progress = (progress + 10) % 100; // Looping animation
                loadingBar.style.width = progress + "%";
            }, 300);

            fetch(form.action, {
                method: "POST",
                body: new FormData(form),
            })
            .then(response => response.text()) // Google Sheets pop-up appears here
            .then(() => {
                form.reset(); // Reset the form
                clearInterval(interval); // Stop loading animation
                
                // ** Wait for the user to click "OK" on Google Sheets pop-up **
                setTimeout(() => {
                    alert("Successfully submitted! ✅"); // Extra confirmation
                    loadingOverlay.style.display = "none"; // Hide loading screen
                    loadingBar.style.width = "0%"; // Reset loading bar
                }, 500); // Small delay to ensure Google Sheets message appears first
            })
            .catch(error => {
                console.error("Submission Error:", error);
            });
        });
    }
});
