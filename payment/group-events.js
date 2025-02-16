const groupEventScriptURL = 'https://script.google.com/macros/s/AKfycbw4Dni0BGubf25DgfITGkLMashIQQIFB7l2mqatCb5wfsAZRmu0jw0R4K8C38t_lmlETg/exec';
const groupEventForm = document.forms['groupEventForm'];
const eventFieldGroup = document.getElementById("event");

const urlParamsGroup = new URLSearchParams(window.location.search);
const eventNameGroup = urlParamsGroup.get("event");
if (eventNameGroup) {
    eventFieldGroup.value = eventNameGroup;
}

groupEventForm.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("playerNames", groupEventForm.playerNames.value);
    formData.append("email", groupEventForm.email.value);
    formData.append("year", groupEventForm.year.value);
    formData.append("branch", groupEventForm.branch.value);
    formData.append("event", eventFieldGroup.value);
    formData.append("registrationNumber", groupEventForm.registrationNumber.value);

    fetch(groupEventScriptURL, { method: 'POST', body: formData, mode: "no-cors" })
    .then(() => {
        alert("Thank you! Your group registration details are submitted.");
        groupEventForm.reset();
    })
    .catch(error => console.error('Error!', error.message));
});
