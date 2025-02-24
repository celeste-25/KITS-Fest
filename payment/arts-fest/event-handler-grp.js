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
    const loadingBarContainer = document.getElementById("loadingBarContainer");
    const loadingBar = document.getElementById("loadingBar");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Stop default form submission

            // Show loading bar
            loadingBarContainer.style.display = "block";
            loadingBar.style.width = "0%"; // Reset loading bar
            setTimeout(() => loadingBar.style.width = "100%", 50); // Animate loading bar

            fetch(form.action, {
                method: "POST",
                body: new FormData(form),
            })
            .then(response => response.text()) // Use text instead of JSON if Apps Script does not return JSON
            .then(() => {
                alert("Successfully submitted! ✅");
                form.reset(); // Reset the form after successful submission
            })
            .catch(error => {
                alert("Submission failed. Please try again.");
                console.error("Error:", error);
            })
            .finally(() => {
                // Hide loading bar after submission completes
                setTimeout(() => {
                    loadingBarContainer.style.display = "none";
                    loadingBar.style.width = "0%";
                }, 500);
            });
        });
    }
});


