const offlineScriptURL = 'https://script.google.com/macros/s/AKfycbxiSMCWPYiNDNxmP5SBF4BYjq3SWhJoQmvCduUP8i62GLR2k9uL-33Qyw1g0hqb7Gaz/exec';
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
        .then(response => response.json())
        .then(response => {
            alert(response.message);
            offlineForm.reset();
        })
        .catch(error => console.error('Error!', error.message));
});
