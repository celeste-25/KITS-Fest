function setupVideoHover(video) {
    video.addEventListener("mouseenter", () => {
      video.play(); // Play video on hover
    });
  
    video.addEventListener("mouseleave", () => {
      video.pause(); // Pause video when mouse leaves
      video.currentTime = 0; // Reset to the first frame
    });
  }
  
  // Get all video elements with the class "funElement"
  const videos = document.querySelectorAll(
    ".funElement1, .funElement2, .funElement3, .funElement4"
  );
  
  // Apply hover behavior to all videos
  videos.forEach((video) => {
    setupVideoHover(video);
  });