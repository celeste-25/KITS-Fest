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
