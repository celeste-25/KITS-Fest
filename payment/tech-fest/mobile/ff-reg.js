document.getElementById("groupEventForm").addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("Form submission started");

    let formData = new FormData(this);
    let fileInput = document.getElementById("image");
    let file = fileInput.files[0];

    if (file) {
        console.log("File selected");
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            console.log("File read successfully");
            formData.append("imageData", reader.result.split(',')[1]);
            submitForm(formData);
        };
    } else {
        console.log("No file selected");
        submitForm(formData);
    }
});

function submitForm(formData) {
    console.log("Submitting form to the server...");
    fetch("https://script.google.com/macros/s/AKfycbwOOoIc4U8tU8pRtq0C29i1ocSkI8kho8S9hxRNdGEL659BpP1Y3XD1DO53fm1-NLbC/exec", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log("Server response:", data);
        alert(data.message);
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Error submitting form. Try again.");
    });
}
