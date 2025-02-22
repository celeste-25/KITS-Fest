const scriptURL = 'https://script.google.com/macros/s/AKfycbxAX6HDuWd28iIzVsZitSQ1_onnQ2TYHxP3hzSCUb23_OR6BJYSyH5TqsPPqI05iGtnhw/exec';
const form = document.forms['paymentForm'];

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
