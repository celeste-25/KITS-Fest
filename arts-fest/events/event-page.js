document.addEventListener('DOMContentLoaded', function() {
    const eventImg = document.querySelector('.right-section img');
    
    if(eventImg && eventImg.src) {
        // Create overlay container
        const overlay = document.createElement('div');
        overlay.className = 'background-overlay';
        
        // Create image clone for background
        const bgImage = new Image();
        bgImage.src = eventImg.src;
        
        bgImage.onload = function() {
            overlay.style.backgroundImage = `url('${eventImg.src}')`;
            document.body.insertBefore(overlay, document.body.firstChild);
            
            // Add slight delay for smooth rendering
            setTimeout(() => {
                overlay.style.opacity = '1';
            }, 100);
        };

        // Error handling
        bgImage.onerror = function() {
            console.error('Failed to load background image:', eventImg.src);
        };
        
        // Initial styles
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.5s ease';
    }
});