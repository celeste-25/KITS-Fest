// xenos lopp video

// document.addEventListener("DOMContentLoaded", function (){
//     const xenosvideo = document.querySelector(".funElement1");

//     if(xenosvideo) {
//         xenosvideo.addEventListener("mouseover", function (){
//             xenosvideo.play();
//             xenosvideo.loop = true;
//         });

//         xenosvideo.addEventListener("mouseleave", function () {
//             xenosvideo.pause();
//             xenosvideo.currentTime = 0;
//         });
//     }
// });

// const video = document.getElementById("funElement1");

// video.addEventListener("mouseenter", () => {
//   video.play();
// });

// video.addEventListener("mouseleave", () => {
//   video.pause();
//   video.currentTime = 0;
// });

// const video = document.getElementById("funElement1");

// // Show a loading state until the video is ready
// video.addEventListener("waiting", () => {
//   console.log("Video is loading...");
// });

// video.addEventListener("canplay", () => {
//   console.log("Video is ready to play!");
//   video.addEventListener("mouseenter", () => {
//     video.play();
//   });

//   video.addEventListener("mouseleave", () => {
//     video.pause();
//     video.currentTime = 0; // Reset to the first frame
//   });
// });

// Function to handle video hover behavior
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

//// NAV BAR

// const hamburgerMenu = document.querySelector('.hamburger-menu');
// const navbar = document.querySelector('.navbar');

// hamburgerMenu.addEventListener('click', () => {
//   navbar.classList.toggle('active');
//   console.log('Menu clicked!'); // Debugging check
// });

const hamburger = document.querySelector(".hamburger-menu");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.style.display =
    navLinks.style.display === "block" ? "none" : "block";
});
