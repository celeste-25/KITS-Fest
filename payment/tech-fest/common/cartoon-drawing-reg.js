const offlineScriptURL = 'https://script.google.com/macros/s/AKfycbzpLmlGvBALwP0aTddpAU05dlkgRdafi7TgZ-Thjk963k62aTsrhM0bapNGtoP05er_/exec'; 
const offlineForm = document.forms['offlinePaymentForm'];
const eventFieldOffline = document.getElementById("event");

const urlParamsOffline = new URLSearchParams(window.location.search);
const eventNameOffline = urlParamsOffline.get("event");
if (eventNameOffline) {
    eventFieldOffline.value = eventNameOffline;
}

offlineForm.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(offlineForm);

    fetch(offlineScriptURL, { 
        method: 'POST', 
        body: formData, 
        mode: "no-cors" 
    })
    .then(() => {
        alert("Thank you! Your registration details are successfully submitted.");
        offlineForm.reset();
    })
    .catch(error => console.error('Error!', error.message));
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
