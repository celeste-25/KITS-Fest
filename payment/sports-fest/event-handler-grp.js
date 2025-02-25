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
});

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form[name='groupEventForm']");
    const loadingOverlay = document.getElementById("loadingOverlay");
    const loadingBar = document.querySelector(".loadingBar");
    const submitButton = form.querySelector("input[type='submit']");
    let isSubmitting = false;

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            if (isSubmitting) return;
            isSubmitting = true;
            submitButton.disabled = true;

            loadingOverlay.style.display = "flex";
            loadingBar.style.width = "0%";

            let progress = 0;
            const interval = setInterval(() => {
                progress = (progress + 10) % 100;
                loadingBar.style.width = progress + "%";
            }, 300);

            const formData = new FormData(form);

            fetch(form.action, {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .then(() => {
                clearInterval(interval);
                loadingOverlay.style.display = "none";
                alert("Thank you! Your registration details are successfully submitted.");
                form.reset();
                submitButton.disabled = false;
                isSubmitting = false;
            })
            .catch(error => {
                clearInterval(interval);
                loadingOverlay.style.display = "none";
                alert("There was an error submitting your form. Please try again later.");
                console.error('Error!', error.message);
                submitButton.disabled = false;
                isSubmitting = false;
            });
        });

        window.addEventListener("focus", function () {
            loadingOverlay.style.display = "none";
            loadingBar.style.width = "0%";
        });
    }
});
