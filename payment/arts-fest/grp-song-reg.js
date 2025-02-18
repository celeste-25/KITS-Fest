const groupScriptURL = 'https://script.google.com/macros/s/AKfycbzTP2_tPaK9Eifv0_MSVIJEPaox6yAfzEBN8GQxlUiTkPMHSqIR3QQRl9T0r0Mby1zorg/exec'; 
const groupForm = document.forms['groupEventForm'];
const eventFieldGroup = document.getElementById("event");

const urlParamsGroup = new URLSearchParams(window.location.search);
const eventNameGroup = urlParamsGroup.get("event");
if (eventNameGroup) {
    eventFieldGroup.value = eventNameGroup;
}

groupForm.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(groupForm);

    fetch(groupScriptURL, { 
        method: 'POST', 
        body: formData, 
        mode: "no-cors" 
    })
    .then(() => {
        alert("Thank you! Your registration details are submitted.");
        groupForm.reset();
    })
    .catch(error => console.error('Error!', error.message));
});
