const offlineScriptURL = 'https://script.google.com/macros/s/AKfycby_k75RjCwO4BYLZyrMR9ssmpJZ9XDhU8o3Rz0Ldmu3z9KeYi7Skd-NpbhG8dt35l5U/exec'; 
const offlineForm = document.forms['offlinePaymentForm'];
const eventFieldOffline = document.getElementById("event");
let isSubmitting = false;

const urlParamsOffline = new URLSearchParams(window.location.search);
const eventNameOffline = urlParamsOffline.get("event");
if (eventNameOffline) {
    eventFieldOffline.value = eventNameOffline;
}

offlineForm.addEventListener('submit', e => {
    e.preventDefault();
    if (isSubmitting) return;
    isSubmitting = true;

    const loadingOverlay = document.getElementById("loadingOverlay");
    const loadingBar = document.querySelector(".loadingBar");
    const submitButton = offlineForm.querySelector("input[type='submit']");
    submitButton.disabled = true;

    loadingOverlay.style.display = "flex";
    loadingBar.style.width = "0%";

    let progress = 0;
    const interval = setInterval(() => {
        progress = (progress + 10) % 100;
        loadingBar.style.width = progress + "%";
    }, 300);

    const formData = new FormData(offlineForm);

    fetch(offlineScriptURL, { 
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
        offlineForm.reset();
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
