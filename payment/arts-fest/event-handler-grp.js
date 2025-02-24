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
    const submitButton = document.getElementById("submit");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Stop form from redirecting

            submitButton.value = "Submitting..."; // Change button text
            submitButton.disabled = true; // Disable button to prevent multiple clicks

            const formData = new FormData(form);

            fetch(form.action, {
                method: "POST",
                body: formData,
            })
            .then(response => response.text()) // Use text since Google Apps Script doesn't always return JSON
            .then(() => {
                alert("Successfully submitted! ✅");
                form.reset(); // Clear the form
            })
            .catch(error => {
                alert("Error submitting the form. Please try again.");
                console.error("Error:", error);
            })
            .finally(() => {
                submitButton.value = "Submit"; // Reset button text
                submitButton.disabled = false; // Re-enable button
            });
        });
    }
});
