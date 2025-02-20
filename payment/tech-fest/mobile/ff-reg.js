document.getElementById("groupEventForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let formData = new FormData(this);
    let fileInput = document.getElementById("image");
    let file = fileInput.files[0];

    if (file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            formData.append("imageData", reader.result);
            submitForm(formData);
        };
    } else {
        submitForm(formData);
    }
});

function submitForm(formData) {
    fetch("https://script.google.com/macros/s/AKfycbys66Qwom9qWLYFVTCGd2Sp18SkLrJz6rmgQ88_ShR9DLxQ03PrgkP_Av6DIFokUT3u/exec", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    })
    .catch(error => {
        alert("Error submitting form. Try again.");
        console.error("Error:", error);
    });
}
