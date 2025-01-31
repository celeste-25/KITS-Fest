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

    const response = await fetch("https://script.google.com/macros/s/AKfycbyPsXXmQOCqg3a3FR06gbxuqn1c4hxEl6iAeO7CHOU7qE9gChvx81BdCb5pjZNwsjii3w/exec", {
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
