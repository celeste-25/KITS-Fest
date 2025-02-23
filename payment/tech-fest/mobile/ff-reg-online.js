const scriptURL = 'https://script.google.com/macros/s/AKfycbxr2EKiGWbU11tJE6ipdfaMTJIkYSnVjZmPFs6YW-gfoLIcRr2LqQY758_k6c6pps_mTw/exec';
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

    const formData = new FormData(groupEventForm);
    formData.append("event", eventFieldGroup.value); 

    let fr = new FileReader();
    fr.onloadend = () => {
        const base64Data = fr.result.split("base64,")[1];
        formData.append("base64", base64Data);
        formData.append("imageType", fileInput.files[0].type);
        formData.append("imageName", fileInput.files[0].name);

        fetch(groupEventForm.action, { method: 'POST', body: formData })
        .then(response => response.json())
        .then(response => {
            alert(response.message);
            groupEventForm.reset();
            preview.style.display = "none";
        })
        .catch(error => console.error('Error!', error.message));
    };
    fr.readAsDataURL(fileInput.files[0]);
});
