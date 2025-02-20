document.getElementById("groupEventForm").addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("Free Fire form submission started");

    let formData = new FormData(this);
    let fileInput = document.getElementById("image");
    let file = fileInput.files[0];

    if (file) {
        console.log("File selected for Free Fire");
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            console.log("File read successfully for Free Fire");
            formData.append("imageData", reader.result);
            submitForm(formData);
        };
    } else {
        console.log("No file selected for Free Fire");
        submitForm(formData);
    }
});

function submitForm(formData) {
    console.log("Submitting Free Fire form to the server...");
    fetch("https://script.google.com/macros/s/AKfycbys66Qwom9qWLYFVTCGd2Sp18SkLrJz6rmgQ88_ShR9DLxQ03PrgkP_Av6DIFokUT3u/exec", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log("Free Fire server response:", data);
        alert(data.message);
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Error submitting Free Fire form. Try again.");
    });
}
