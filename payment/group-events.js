const groupEventForm = document.forms['groupEventForm'];
const eventFieldGroup = document.getElementById("event");

const urlParamsGroup = new URLSearchParams(window.location.search);
const eventNameGroup = urlParamsGroup.get("event");
if (eventNameGroup) {
    eventFieldGroup.value = eventNameGroup;
}

groupEventForm.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(groupEventForm);

    fetch(groupEventForm.action, { method: 'POST', body: formData, mode: "no-cors" })
    .then(() => {
        alert("Thank you! Your group registration details are submitted.");
        groupEventForm.reset();
    })
    .catch(error => console.error('Error!', error.message));
});
