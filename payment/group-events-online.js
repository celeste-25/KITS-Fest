const groupEventForm = document.forms['groupEventForm'];
const fileInput = document.getElementById("image");
const preview = document.getElementById("preview");
const eventFieldGroup = document.getElementById("event");

// Get event name from URL
const urlParamsGroup = new URLSearchParams(window.location.search);
const eventNameGroup = urlParamsGroup.get("event");
if (eventNameGroup) {
    eventFieldGroup.value = decodeURIComponent(eventNameGroup); // Decode the event name
}

// Image Preview
fileInput.addEventListener("change", () => {
    let fr = new FileReader();
    fr.onloadend = () => {
        preview.src = fr.result;
        preview.style.display = "block";
    };
    fr.readAsDataURL(fileInput.files[0]);
});

// Form Submission
groupEventForm.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("teamLeaderName", groupEventForm.teamLeaderName.value);
    formData.append("playerNames", groupEventForm.playerNames.value);
    formData.append("email", groupEventForm.email.value);
    formData.append("year", groupEventForm.year.value);
    formData.append("branch", groupEventForm.branch.value);
    formData.append("event", eventFieldGroup.value); // Include event name
    formData.append("registrationNumber", groupEventForm.registrationNumber.value);
    formData.append("transactionId", groupEventForm.transactionId.value);

    let fr = new FileReader();
    fr.onloadend = () => {
        let base64Data = fr.result.split("base64,")[1];
        formData.append("base64", base64Data);
        formData.append("imageType", fileInput.files[0].type);
        formData.append("imageName", fileInput.files[0].name);

        fetch(groupEventForm.action, { method: 'POST', body: formData, mode: "no-cors" })
        .then(() => {
            alert("Thank you! Your group registration details are submitted.");
            groupEventForm.reset();
            preview.style.display = "none";
        })
        .catch(error => console.error('Error!', error.message));
    };
    fr.readAsDataURL(fileInput.files[0]);
});
