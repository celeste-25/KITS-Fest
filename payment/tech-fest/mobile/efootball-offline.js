const offlineScriptURL = 'https://script.google.com/macros/s/AKfycbxAX6HDuWd28iIzVsZitSQ1_onnQ2TYHxP3hzSCUb23_OR6BJYSyH5TqsPPqI05iGtnhw/exec';
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
