document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const eventName = urlParams.get("event").toUpperCase().replace(/%20/g, " ");
    const eventField = document.getElementById("event");
    
    if (eventName) {
        eventField.value = eventName;
        let scriptSrc;

        if (eventName === "Athletics 100m") {
            scriptSrc = "athletics/100m.js";
        } else if (eventName === "Athletics 200m") {
            scriptSrc = "athletics/200m.js";
        } else if (eventName === "Athletics - Long Jump") {
            scriptSrc = "athletics/long-jump.js";
        } else if (eventName === "Athletics - Javelin Throw") {
            scriptSrc = "javelin.js";
        } else if (eventName === "Athletics - ShotPut") {
            scriptSrc = "shotput.js";
        } else if (eventName === "Athletics - Disk Throw") {
            scriptSrc = "disk.js";
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
