const groupEventForm = document.forms['groupEventForm'];
const fileInput = document.getElementById("image");
const preview = document.getElementById("preview");
const eventFieldGroup = document.getElementById("event");

const urlParamsGroup = new URLSearchParams(window.location.search);
const eventNameGroup = urlParamsGroup.get("event");
if (eventNameGroup) {
    eventFieldGroup.value = decodeURIComponent(eventNameGroup);
}

fileInput.addEventListener("change", () => {
    let fr = new FileReader();
    fr.onloadend = () => {
        preview.src = fr.result;
        preview.style.display = "block";
    };
    fr.readAsDataURL(fileInput.files[0]);
});

groupEventForm.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("teamLeaderName", groupEventForm.teamLeaderName.value);
    formData.append("playerNames", groupEventForm.playerNames.value);
    formData.append("email", groupEventForm.email.value);
    formData.append("year", groupEventForm.year.value);
    formData.append("branch", groupEventForm.branch.value);
    formData.append("event", eventFieldGroup.value);
    formData.append("registrationNumber", groupEventForm.registrationNumber.value);
    formData.append("transactionId", groupEventForm.transactionId.value);

    let fr = new FileReader();
    fr.onloadend = () => {
        let base64Data = fr.result.split("base64,")[1];
        formData.append("base64", base64Data);
        formData.append("imageType", fileInput.files[0].type);
        formData.append("imageName", fileInput.files[0].name);

        fetch(groupEventForm.action, { method: 'POST', body: formData })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            if (data.result === 'success') {
                groupEventForm.reset();
                preview.style.display = "none";
            }
        })
        .catch(error => {
            alert('Error submitting your registration. Please try again later.');
            console.error('Error!', error.message);
        });
    };
    fr.readAsDataURL(fileInput.files[0]);
});
