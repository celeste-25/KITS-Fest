const offlineScriptURL = 'https://script.google.com/macros/s/AKfycbzTP2_tPaK9Eifv0_MSVIJEPaox6yAfzEBN8GQxlUiTkPMHSqIR3QQRl9T0r0Mby1zorg/exec'; 
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
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.result === "success") {
            alert("Thank you! Your offline payment details are submitted.");
            offlineForm.reset();
        } else {
            alert("Something went wrong. Please try again.");
        }
    })
    .catch(error => {
        alert("There was an error submitting your form. Please try again later.");
        console.error('Error!', error.message);
    });
});
