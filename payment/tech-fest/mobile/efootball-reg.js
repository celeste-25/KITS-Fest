const offlineScriptURL = 'https://script.google.com/macros/s/AKfycbwoNpYC__tjOJEnP0jrD5frLzdr7_X3mEu5Kd0tqh45Rqu3IkCJyqMacjs0f_FpMuuOqA/exec'; 
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
