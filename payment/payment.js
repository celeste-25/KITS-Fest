document.getElementById("paymentForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    
    const name = document.getElementById("name").value;
    const year = document.getElementById("year").value;
    const branch = document.getElementById("branch").value;
    const eventType = document.getElementById("eventType").value;
    const transactionId = document.getElementById("transactionId").value;
    
    const formData = {
        name,
        year,
        branch,
        eventType,
        transactionId,
        imageUrl: "Uploaded Image (Not saved here)"
    };

    const response = await fetch("YOUR_GOOGLE_SCRIPT_URL_HERE", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" }
    });

    if (response.ok) {
        alert("Payment data submitted successfully!");
        document.getElementById("paymentForm").reset();
    } else {
        alert("Error submitting payment.");
    }
});
