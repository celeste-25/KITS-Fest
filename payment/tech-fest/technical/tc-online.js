const offlineScriptURL = 'https://script.google.com/macros/s/AKfycbyaVSmpRIpmlKTTgZhBENCo2Mh48c4btBfDigrhGZ3m8dq7FuKxeG0IGhQfckzbh2HdSg/exec';
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
