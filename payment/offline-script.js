const scriptURL = 'https://script.google.com/macros/s/AKfycbwzErJi7cft8A0GKV9DG3WNr99bcz5PF2cSfuP5ZyKndwCP7BpDVzmTrgXR168xC6CV/exec'; // Replace with actual URL
const form = document.forms['paymentForm'];
const fileInput = document.getElementById("image");
const preview = document.getElementById("preview");
const eventField = document.getElementById("event");

// Get event name from URL
const urlParams = new URLSearchParams(window.location.search);
const eventName = urlParams.get("event");
if (eventName) {
    eventField.value = eventName;
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
form.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name.value);
    formData.append("email", form.email.value);
    formData.append("year", form.year.value);
    formData.append("branch", form.branch.value);
    formData.append("event", eventField.value); // Include event name

    let fr = new FileReader();
    fr.onloadend = () => {
        let base64Data = fr.result.split("base64,")[1];
        formData.append("base64", base64Data);
        formData.append("imageType", fileInput.files[0].type);
        formData.append("imageName", fileInput.files[0].name);

        fetch(scriptURL, { method: 'POST', body: formData, mode: "no-cors" })
        .then(() => {
            alert("Thank you! Your payment details are submitted.");
            form.reset();
            preview.style.display = "none";
        })
        .catch(error => console.error('Error!', error.message));
    };
    fr.readAsDataURL(fileInput.files[0]);
});
