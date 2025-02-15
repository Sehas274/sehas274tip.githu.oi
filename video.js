// video.js

function openVideo(videoUrl) {
  const videoModal = document.getElementById('videoModal');
  const videoFrame = document.getElementById('videoFrame');

  // Check if the browser can play the video
  const videoElement = document.createElement('video');
  const canPlay = videoElement.canPlayType('video/mp4'); // Adjust the MIME type if necessary

  if (canPlay === 'probably' || canPlay === 'maybe') {
    // If the browser can play the video, set the iframe source
    videoFrame.src = videoUrl;
    videoModal.style.display = 'block';
  } else {
    // If the browser cannot play the video, show a user-friendly message
    alert('Your browser does not support this video format. Please try using a different browser or device.');
  }
}

function closeVideo() {
  const videoModal = document.getElementById('videoModal');
  const videoFrame = document.getElementById('videoFrame');

  videoFrame.src = ''; // Stop the video
  videoModal.style.display = 'none';
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
  const videoModal = document.getElementById('videoModal');
  if (event.target === videoModal) {
    closeVideo();
  }
};

// Disable right-click and inspect element
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
    e.preventDefault();
  }
});