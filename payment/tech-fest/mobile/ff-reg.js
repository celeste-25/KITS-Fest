document.getElementById("groupEventForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let formData = new FormData(this);
    let fileInput = document.getElementById("image");
    let file = fileInput.files[0];

    let urlParams = new URLSearchParams(window.location.search);
    let eventName = urlParams.get("event") || "Free Fire";  

    formData.append("event", eventName);

    if (file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            let base64Data = reader.result.split("base64,")[1];
            formData.append("base64", base64Data);
            formData.append("imageType", file.type);
            formData.append("imageName", file.name);

            sendData(formData);
        };
    } else {
        sendData(formData);
    }
});

function sendData(formData) {
    fetch("https://script.google.com/macros/s/AKfycbzfyeaxVAtyOdd_QjsBzDBLlWtSwhTKNnIpVi79Q8AXOfFkgsKTTRhNJOaYwzRcFA8/exec", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        location.reload();
    })
    .catch(error => console.error("Error:", error));
}
