const offlineScriptURL = 'https://script.google.com/macros/s/AKfycbytUKT_BDzwhlc-EJ0Cr5QaUwg9PaHGyyHhYv_kOqOqWIZ2UPf-7pbTbBU5f2oOxWyo/exec'; 
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
