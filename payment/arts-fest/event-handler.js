document.addEventListener('DOMContentLoaded', function () {
    const eventField = document.getElementById("event");
    const offlineForm = document.forms['offlinePaymentForm'];

    eventField.addEventListener('change', function () {
        const selectedEvent = eventField.value;
        let scriptSrc;

        if (selectedEvent === "SOLO%20SONG") {
            scriptSrc = "solo-song-reg.js";
        } else if (selectedEvent === "SOLO DANCE") {
            scriptSrc = "solo-dance-reg.js";
        } else if (selectedEvent === "SPOT%20CHOREOGRAPHY") {
            scriptSrc = "spot-choreo-reg.js";
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
    });
});
