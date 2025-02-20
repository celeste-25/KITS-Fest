document.addEventListener("DOMContentLoaded", function () {
    console.log("Form Handler Loaded");

    const form = document.getElementById("groupEventForm");
    const submitButton = document.getElementById("submit");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); 
        submitButton.value = "Submitting...";
        submitButton.disabled = true;

        const formData = new FormData(form);
        
        fetch("https://script.google.com/macros/s/AKfycbyKxtSD2vUcT4xONJArqj7CRfHODg_IizZXrlY3s7GNVzLnz2x-hh8rEvowNSTNvixm/exec", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log("Form submitted successfully", data);
            alert("Registration successful!");
            form.reset();
            submitButton.value = "Submit";
            submitButton.disabled = false;
        })
        .catch(error => {
            console.error("Submission failed", error);
            alert("Failed to submit. Please try again.");
            submitButton.value = "Submit";
            submitButton.disabled = false;
        });
    });
});
