document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const eventName = urlParams.get("event").toUpperCase().replace(/%20/g, " ");
    const eventField = document.getElementById("event");
    
    if (eventName) {
        eventField.value = eventName;
        let scriptSrc;

        switch (eventName) {
            case "Mens Football":
                scriptSrc = "mens/football.js";
                break;
            case "Mens Cricket":
                scriptSrc = "mens/cricket.js";
                break;
            case "Mens Volleyball":
                scriptSrc = "mens/volleyball.js";
                break;
            case "Mens BADMINTON DOUBLES":
                scriptSrc = "mens/badminton.js";
                break;
            case "Mens Relay 400 Meters":
                scriptSrc = "mens/relay.js";
                break;
            case "Womens Throwball":
                scriptSrc = "womens/throw.js";
                break;
            case "Womens BADMINTON DOUBLES":
                scriptSrc = "womens/badminton.js";
                break;
            case "Womens Penalty Shootout":
                scriptSrc = "womens/penalty.js";
                break;
            case "Womens Relay 400 Meters":
                scriptSrc = "womens/relay.js";
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

    document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form[name='groupEventForm']");
    
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Stop default form submission
            
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
            });
        });
    }
});

});
