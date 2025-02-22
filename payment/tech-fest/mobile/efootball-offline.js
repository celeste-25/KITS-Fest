const offlineScriptURL = 'https://script.google.com/macros/s/AKfycbziD9LjZK2Rh_XWBqaZ0gZwU5G0MxKBVy-RK93Qryvo3rkNGwTdeVTBJJIj5ASCr2r-Lw/exec';
const offlineForm = document.forms['offlinePaymentForm'];

offlineForm.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(offlineForm);

    fetch(offlineScriptURL, { method: 'POST', body: formData })
        .then(response => response.json())
        .then(response => {
            alert(response.message);
            offlineForm.reset();
        })
        .catch(error => console.error('Error!', error.message));
});
