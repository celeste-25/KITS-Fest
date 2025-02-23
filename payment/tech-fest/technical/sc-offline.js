const offlineScriptURL = 'https://script.google.com/macros/s/AKfycbwjbUi7USceSt1ksKNW-q2b9LSUL3RT93fEmXX_E6r_5k-lIB2q0zxaDe3W7wUrQb_J/exec';
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
    formData.append('event', eventField.value);

    fetch(offlineScriptURL, { method: 'POST', body: formData })
        .then(response => response.json())
        .then(response => {
            if (response.result === 'success') {
                alert(response.message);
                offlineForm.reset();
            } else {
                alert(response.message);
            }
        })
        .catch(error => console.error('Error!', error.message));
});
