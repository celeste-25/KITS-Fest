document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const eventName = urlParams.get("event").toUpperCase().replace(/%20/g, " ");
    const eventField = document.getElementById("event");
    
    if (eventName) {
        eventField.value = eventName;
        let scriptSrc;

        switch (eventName) {
            case "BGMI":
                scriptSrc = "bgmi-reg.js";
                break;
            case "Free Fire":
                scriptSrc = "ff-reg.js";
                break;
            case "E-Football":
                scriptSrc = "pes-reg.js";
                break;
            default:
                scriptSrc = "";
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
