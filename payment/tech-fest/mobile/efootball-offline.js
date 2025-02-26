const offlineScriptURL = 'https://script.google.com/macros/s/AKfycbziD9LjZK2Rh_XWBqaZ0gZwU5G0MxKBVy-RK93Qryvo3rkNGwTdeVTBJJIj5ASCr2r-Lw/exec';
const offlineForm = document.forms['offlinePaymentForm'];

const urlParams = new URLSearchParams(window.location.search);
const eventName = urlParams.get("event");
const eventField = document.getElementById("event");

if (eventName) {
    eventField.value = eventName;
    document.getElementById('eventTitle').innerText = `Event: ${eventName}`;
}

offlineForm.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(offlineForm);

    const loadingOverlay = document.getElementById("loadingOverlay");
    const loadingBar = document.querySelector(".loadingBar");
    const submitButton = offlineForm.querySelector("input[type='submit']");
    let isSubmitting = false; // Prevent double submission

    if (loadingOverlay) {
        loadingOverlay.style.display = "flex";
    } else {
        console.error("❌ Loading overlay not found!");
    }

    if (!loadingBar) {
        console.error("❌ Loading bar not found!");
    } else {
        loadingBar.style.width = "0%"; // Reset loading bar

        // Start loading animation
        let progress = 0;
        const interval = setInterval(() => {
            progress = (progress + 10) % 100;
            loadingBar.style.width = progress + "%";
            console.log(`⏳ Loading progress: ${progress}%`);
        }, 300);

        // Submit form using fetch()
        fetch(offlineScriptURL, { method: 'POST', body: formData })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(response => {
                alert(response.message);
                clearInterval(interval);
                offlineForm.reset();

                // Hide loading overlay **AFTER user clicks "OK"**
                setTimeout(() => {
                    if (loadingOverlay) {
                        loadingOverlay.style.display = "none";
                    }
                }, 1000);

                submitButton.disabled = false;
                isSubmitting = false;
            })
            .catch(error => {
                console.error('Error!', error.message);
                clearInterval(interval);
                if (loadingOverlay) loadingOverlay.style.display = "none";
                alert('There was an error submitting your form. Please try again later.');
                submitButton.disabled = false;
                isSubmitting = false;
            });
    }
});
