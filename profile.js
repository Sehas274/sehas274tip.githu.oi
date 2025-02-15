// Tab Switching Functionality
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get the tab ID from data attribute
        const tabId = button.dataset.tab;
        
        // Hide all tab contents
        document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('active');
        });
        
        // Show selected tab content
        document.getElementById(tabId).classList.add('active');
    });
});

// Search Functionality
document.querySelector('.search-button').addEventListener('click', () => {
    const searchTerm = document.querySelector('.search-input').value;
    console.log('Searching for:', searchTerm);
    // Add your search logic here
});

// Video Card Hover Effects
document.querySelectorAll('.video-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Get video URL from query parameters
const urlParams = new URLSearchParams(window.location.search);
const videoSrc = urlParams.get('video');

if (videoSrc) {
    document.getElementById('videoSource').src = videoSrc;
    document.getElementById('mainVideoPlayer').load();
}