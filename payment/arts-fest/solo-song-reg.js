const offlineScriptURL = 'https://script.google.com/macros/s/AKfycbygNWS71pJMRMq1urejvTHbKhW7AOgXwUqKaD_uf3nBNPUUzr1cm5y1J9X8tPEY5s3t/exec'; 
const offlineForm = document.forms['offlinePaymentForm'];
const eventFieldOffline = document.getElementById("event");

const urlParamsOffline = new URLSearchParams(window.location.search);
const eventNameOffline = urlParamsOffline.get("event");
if (eventNameOffline) {
    eventFieldOffline.value = eventNameOffline;
}

offlineForm.addEventListener('submit', e => {
    e.preventDefault();

    // Show loading screen
    const loadingOverlay = document.getElementById("loadingOverlay");
    const loadingBar = document.querySelector(".loadingBar");
    loadingOverlay.style.display = "flex";
    loadingBar.style.width = "0%";

    // Start loading animation
    let progress = 0;
    const interval = setInterval(() => {
        progress = (progress + 10) % 100;
        loadingBar.style.width = progress + "%";
    }, 300);

    const formData = new FormData(offlineForm);

    fetch(offlineScriptURL, { 
        method: 'POST', 
        body: formData, 
        mode: "no-cors" 
    })
    .then(() => {
        // Hide loading screen
        clearInterval(interval);
        loadingOverlay.style.display = "none";
        alert("Thank you! Your registration details are successfully submitted.");
        offlineForm.reset();
    })
    .catch(error => {
        clearInterval(interval);
        loadingOverlay.style.display = "none";
        console.error('Error!', error.message);
    });
});
