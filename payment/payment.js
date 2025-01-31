document.getElementById("paymentForm").addEventListener("submit", function (e) {
    e.preventDefault(); 
    console.log("Submitting data to Google Sheets..."); 

    let formData = new FormData(this);
    let data = {};

    formData.forEach((value, key) => { 
        data[key] = value;
    });

    console.log("Form Data:", data); 

    fetch("https://script.google.com/macros/s/AKfycbyajUmXaeaAZJev-JhKzdkPU_tkhiK24yM-YdCTRfvXhK1i5OGm4KrnMvOzCVMcFB2y-g/exec", { 
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.text()) 
    .then(result => {
        console.log("Success:", result);
        alert("Payment details submitted successfully!"); 
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Failed to submit payment details. Please try again.");
    });
});
