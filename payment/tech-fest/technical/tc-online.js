const scriptURL = 'https://script.google.com/macros/s/AKfycbyaVSmpRIpmlKTTgZhBENCo2Mh48c4btBfDigrhGZ3m8dq7FuKxeG0IGhQfckzbh2HdSg/exec';
const form = document.forms['paymentForm'];

const urlParams = new URLSearchParams(window.location.search);
const eventName = urlParams.get("event");
const eventField = document.getElementById("event");

if (eventName) {
    eventField.value = eventName;
}

const fileInput = document.getElementById('image');
const preview = document.getElementById('preview');

fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
        preview.src = reader.result;
        preview.style.display = "block";
    };
    reader.readAsDataURL(file);
});

form.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(form);
    formData.append("event", eventField.value);

    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
        const base64String = reader.result.split(',')[1];
        formData.append('base64', base64String);
        formData.append('imageType', file.type);
        formData.append('imageName', file.name);

        fetch(scriptURL, { method: 'POST', body: formData })
            .then(response => response.json())
            .then(response => {
                if (response.result === 'success') {
                    alert(response.message);
                    form.reset();
                    preview.style.display = "none";
                } else {
                    alert(response.message);
                }
            })
            .catch(error => console.error('Error!', error.message));
    };
    reader.readAsDataURL(file);
});
