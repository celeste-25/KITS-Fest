const scriptURL = 'https://script.google.com/macros/s/AKfycbziD9LjZK2Rh_XWBqaZ0gZwU5G0MxKBVy-RK93Qryvo3rkNGwTdeVTBJJIj5ASCr2r-Lw/exec';
const form = document.forms['paymentForm'];

const urlParams = new URLSearchParams(window.location.search);
const eventName = urlParams.get("event");
const eventField = document.getElementById("event");

if (eventName) {
    eventField.value = eventName;
}

form.addEventListener('submit', e => {
    e.preventDefault();

    const fileInput = document.getElementById('image');
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onloadend = function () {
        const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
        const formData = new FormData(form);
        formData.append('base64', base64String);
        formData.append('imageType', file.type);
        formData.append('imageName', file.name);

        fetch(scriptURL, { method: 'POST', body: formData })
            .then(response => response.json())
            .then(response => {
                alert(response.message);
                form.reset();
            })
            .catch(error => console.error('Error!', error.message));
    };

    reader.readAsDataURL(file);
});
