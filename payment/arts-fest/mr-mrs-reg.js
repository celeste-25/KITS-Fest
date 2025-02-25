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

    const loadingOverlay = document.getElementById("loadingOverlay");
    const loadingBar = document.querySelector(".loadingBar");
    loadingOverlay.style.display = "flex";
    loadingBar.style.width = "0%";

    let progress = 0;
    const interval = setInterval(() => {
        progress = (progress + 10) % 100;
        loadingBar.style.width = progress + "%";
    }, 300);

    const formData = new FormData(groupForm);

    fetch(groupScriptURL, { 
        method: 'POST', 
        body: formData, 
        mode: "no-cors" 
    })
    .then(() => {
        clearInterval(interval);
        loadingOverlay.style.display = "none";
        alert("Thank you! Your registration details are submitted.");
        groupForm.reset();
    })
    .catch(error => {
        clearInterval(interval);
        loadingOverlay.style.display = "none";
        alert("There was an error submitting your form. Please try again later.");
        console.error('Error!', error.message);
    });
});
