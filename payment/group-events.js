const offlineScriptURL = 'https://script.google.com/macros/s/AKfycbw7VEiEirtoCsy0yezMOtIznY2kI8BwbjHYrEAXPMUXMw1L2nWkJqNYLX1h-dkmHNyGFA/exec'; 
const offlineForm = document.forms['offlinePaymentForm'];
const eventFieldOffline = document.getElementById("event");

const urlParamsOffline = new URLSearchParams(window.location.search);
const eventNameOffline = urlParamsOffline.get("event");
if (eventNameOffline) {
    eventFieldOffline.value = eventNameOffline;
}

offlineForm.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", offlineForm.name.value);
    formData.append("email", offlineForm.email.value);
    formData.append("year", offlineForm.year.value);
    formData.append("branch", offlineForm.branch.value);
    formData.append("event", eventFieldOffline.value); 
    formData.append("registrationNumber", offlineForm.registrationNumber.value);

    fetch(offlineScriptURL, { method: 'POST', body: formData, mode: "no-cors" })
    .then(() => {
        alert("Thank you! Your offline payment details are submitted.");
        offlineForm.reset();
    })
    .catch(error => console.error('Error!', error.message));
});
