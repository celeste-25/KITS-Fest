document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const eventName = urlParams.get("event").toUpperCase().replace(/%20/g, " ");
    const eventField = document.getElementById("event");
    
    if (eventName) {
        eventField.value = eventName;
        let scriptSrc;

        switch (eventName) {
            case "GROUP SONG":
                scriptSrc = "grp-song-reg.js";
                break;
            case "GROUP DANCE":
                scriptSrc = "grp-dance-reg.js";
                break;
            case "MR. & MRS.":
                scriptSrc = "mr-mrs-reg.js";
                break;
            case "FILM SCENE RECREATION":
                scriptSrc = "film-reg.js";
                break;
            case "FASHION SHOW":
                scriptSrc = "f-show-reg.js";
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

    const form = document.forms['groupEventForm'];
    const loadingOverlay = document.getElementById('loadingOverlay');
    const loadingBar = document.getElementById('loadingBar');
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyVxXMRAfEsEVW4TVz_otqyddSKBPXzIFsQg3ZzeXYcS96BcywjDMf8hVrFlxGm5Mcp3A/exec';

    const updateLoadingBar = () => {
        let width = 0;
        loadingBar.style.width = width;
        const interval = setInterval(() => {
            width += 10;
            if (width >= 100) {
                width = 100;
                clearInterval(interval);
            }
            loadingBar.style.width = width + '%';
        }, 400);
    };

    form.addEventListener('submit', e => {
        e.preventDefault();

        loadingOverlay.style.display = 'flex';
        updateLoadingBar();

        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
            .then(response => response.json())
            .then(response => {
                loadingOverlay.style.display = 'none';
                
                if (response.result === 'success') {
                    alert(response.message);
                    form.reset();
                } else {
                    alert(response.message);
                }
            })
            .catch(error => {
                loadingOverlay.style.display = 'none';
                
                console.error('Error!', error.message);
            });
    });
});
