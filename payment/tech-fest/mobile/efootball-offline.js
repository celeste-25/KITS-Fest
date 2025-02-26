const offlineScriptURL = 'https://script.google.com/macros/s/AKfycbziD9LjZK2Rh_XWBqaZ0gZwU5G0MxKBVy-RK93Qryvo3rkNGwTdeVTBJJIj5ASCr2r-Lw/exec';
const offlineForm = document.forms['offlinePaymentForm'];

const urlParams = new URLSearchParams(window.location.search);
const eventName = urlParams.get("event");
const eventField = document.getElementById("event");

if (eventName) {
    eventField.value = eventName;
    document.getElementById('eventTitle').innerText = `Event: ${eventName}`;
}

offlineForm.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(offlineForm);

    fetch(offlineScriptURL, { method: 'POST', body: formData })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(response => {
            alert(response.message);
            offlineForm.reset();
        })
        .catch(error => {
            console.error('Error!', error.message);
            alert('There was an error submitting your form. Please try again later.');
        });
});
