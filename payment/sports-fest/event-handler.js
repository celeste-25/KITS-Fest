document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const eventName = urlParams.get("event").toUpperCase().replace(/%20/g, " ");
    const eventField = document.getElementById("event");

    if (eventName) {
        eventField.value = eventName;
        let scriptSrc;

        switch (eventName) {
            case "ATHLETICS 100M":
                scriptSrc = "athletics/100m.js";
                break;
            case "ATHLETICS 200M":
                scriptSrc = "athletics/200m.js";
                break;
            case "ATHLETICS LONG JUMP":
                scriptSrc = "athletics/long-jump.js";
                break;
            case "ATHLETICS JAVELIN THROW":
                scriptSrc = "athletics/javelin.js";
                break;
            case "ATHLETICS SHOTPUT":
                scriptSrc = "athletics/shotput.js";
                break;
            case "ATHLETICS DISK THROW":
                scriptSrc = "athletics/disk.js";
                break;
            // Add more if needed
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
