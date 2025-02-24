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

            // Animate loading bar
            let progress = 0;
            const interval = setInterval(() => {
                if (progress >= 100) {
                    clearInterval(interval);
                } else {
                    progress += 10;
                    loadingBar.style.width = progress + "%";
                }
            }, 300);

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
                // Hide loading box after submission completes
                setTimeout(() => {
                    loadingOverlay.style.display = "none";
                }, 500);
            });
        });
    }
});
