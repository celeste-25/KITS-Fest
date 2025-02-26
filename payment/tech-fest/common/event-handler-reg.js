document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const eventName = urlParams.get("event").toUpperCase().replace(/%20/g, " ");
    const eventField = document.getElementById("event");
    
    if (eventName) {
        eventField.value = eventName;
        let scriptSrc;

        if (eventName === "Poem Writing") {
            scriptSrc = "poem-writing-reg.js";
        } else if (eventName === "Essay Writing") {
            scriptSrc = "essay-writing-reg.js";
        } else if (eventName === "Story Writing") {
            scriptSrc = "story-writing-reg.js";
        } else if (eventName === "Pencil Drawing") {
            scriptSrc = "pencil-drawing-reg.js";
        } else if (eventName === "Cartoon Drawing") {
            scriptSrc = "cartoon-drawing-reg.js";
        } else if (eventName === "Face Painting") {
            scriptSrc = "face-painting-reg.js";
        }


        if (scriptSrc) {
            const existingScript = document.getElementById('eventScript');
            if (existingScript) {
                existingScript.remove();
            }
            
            const script = document.createElement('script');
            script.id = 'eventScript';
            script.src = scriptSrc;
            document.body.appendChild(script);
        }
    }
});



const urlParams = new URLSearchParams(window.location.search);
    const eventName = urlParams.get("event");
    const eventField = document.getElementById("event");

    if (eventName) {
        eventField.value = eventName;
        const scriptSrc = `${eventName.toLowerCase().replace(/ /g, '-')}-reg.js`;
        const script = document.createElement('script');
        script.src = scriptSrc;
        document.body.appendChild(script);
    }

    document.addEventListener("DOMContentLoaded", function () {
        console.log("✅ JavaScript Loaded!");
    
        const form = document.querySelector("form[name='offlinePaymentForm']");
        const loadingOverlay = document.getElementById("loadingOverlay");
        const loadingBar = document.querySelector(".loadingBar");
        const submitButton = form.querySelector("input[type='submit']");
        let isSubmitting = false; // Prevent double submission
    
        if (!form) {
            console.error("❌ Form not found!");
            return;
        }
    
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Stop default form submission
    
            if (isSubmitting) {
                console.warn("⚠️ Form already submitted. Preventing duplicate submission.");
                return;
            }
            isSubmitting = true;
            submitButton.disabled = true;
    
            console.log("🚀 Showing loading overlay...");
            
            // ✅ Force display of loading screen
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
    
                // ✅ Submit form using fetch()
                const formData = new FormData(form);
                fetch(form.action, { method: "POST", body: formData, mode: "no-cors" })
                    .then(() => {
                        console.log("✅ Form Successfully Submitted");
                        alert("Thank you! Your registration details are successfully submitted.");
                        clearInterval(interval);
                        form.reset();
    
                        // ✅ Hide loading overlay **AFTER user clicks "OK"**
                        setTimeout(() => {
                            if (loadingOverlay) {
                                loadingOverlay.style.display = "none";
                            }
                        }, 1000);
    
                        submitButton.disabled = false;
                        isSubmitting = false;
                    })
                    .catch(error => {
                        console.error("❌ Error!", error.message);
                        clearInterval(interval);
                        if (loadingOverlay) loadingOverlay.style.display = "none";
                        alert("There was an error submitting your form. Please try again later.");
                        submitButton.disabled = false;
                        isSubmitting = false;
                    });
            }
        });
    
        // **Hide loading bar when user clicks "OK" on pop-up**
        function hideLoadingScreen() {
            if (loadingOverlay) loadingOverlay.style.display = "none";
            if (loadingBar) loadingBar.style.width = "0%";
        }
    
        // ✅ For Desktop: Detect focus when returning to the page
        window.addEventListener("focus", hideLoadingScreen);
    
        // ✅ For Mobile: Detect when the page becomes visible again
        document.addEventListener("visibilitychange", function () {
            if (!document.hidden) hideLoadingScreen();
        });
    });
    
