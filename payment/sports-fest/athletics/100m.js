const offlineScriptURL = 'https://script.google.com/macros/s/AKfycbxqQPH3Z7jFiGvu7hfPDPyp1tCtYdjJ72-zl-jzX66LvUKBTX19wJCT0wHyKMZZ7e-EEw/exec'; 
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
        alert("Thank you! Your offline payment details are submitted.");
        offlineForm.reset();
    })
    .catch(error => console.error('Error!', error.message));
});
