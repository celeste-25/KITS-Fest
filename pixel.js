function pixelTransition() {
    let overlay = document.querySelector(".pixel-overlay");
    overlay.style.transform = "scale(1)"; // Expand overlay

    setTimeout(() => {
        window.location.href = "https://your-next-page-url.com"; // Change to your page URL
    }, 800); // Delay must match transition time
}
