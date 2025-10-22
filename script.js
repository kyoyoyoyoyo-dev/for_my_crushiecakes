// Array of sweet messages to display when "No" is clicked
const sweetMessages = [
    "Are you sure? 🥺",
    "Pretty please? 💕",
    "I think you might want to say yes... 🌸",
    "Just a little game? 🎀",
    "You're breaking my heart 💔",
    "I made this just for you! ✨",
    "You mean so much to me 💫",
    "I'd do anything to see you smile 😊"
];

// Page configuration - easily modifiable for future pages
const pageConfig = {
    nextPage: "page2.html", // Change this to link to the next page
    totalPages: 5 // Total number of pages in the website
};

let messageIndex = 0;
let noClickCount = 0;

function handleYes() {
    // Navigate to the next page
    window.location.href = pageConfig.nextPage;
}

function moveNoButtonSimple() {
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.querySelector('.yes-btn');
    const container = document.querySelector('.buttons-container');
    
    // Get Yes button position
    const yesBtnRect = yesBtn.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    
    // Define safe zones (areas where No button can go)
    const safeZones = [
        { // Top area (above Yes button)
            minX: 0,
            maxX: containerRect.width - noBtn.offsetWidth,
            minY: 0,
            maxY: yesBtn.offsetTop - noBtn.offsetHeight - 10
        },
        { // Bottom area (below Yes button)
            minX: 0,
            maxX: containerRect.width - noBtn.offsetWidth,
            minY: yesBtn.offsetTop + yesBtn.offsetHeight + 10,
            maxY: containerRect.height - noBtn.offsetHeight
        },
        { // Left area
            minX: 0,
            maxX: yesBtn.offsetLeft - noBtn.offsetWidth - 10,
            minY: 0,
            maxY: containerRect.height - noBtn.offsetHeight
        },
        { // Right area
            minX: yesBtn.offsetLeft + yesBtn.offsetWidth + 10,
            maxX: containerRect.width - noBtn.offsetWidth,
            minY: 0,
            maxY: containerRect.height - noBtn.offsetHeight
        }
    ];
    
    // Filter out invalid safe zones (where min > max)
    const validZones = safeZones.filter(zone => 
        zone.minX <= zone.maxX && zone.minY <= zone.maxY
    );
    
    if (validZones.length > 0) {
        // Pick a random safe zone
        const zone = validZones[Math.floor(Math.random() * validZones.length)];
        
        // Calculate random position within the safe zone
        const newX = Math.floor(Math.random() * (zone.maxX - zone.minX)) + zone.minX;
        const newY = Math.floor(Math.random() * (zone.maxY - zone.minY)) + zone.minY;
        
        noBtn.style.position = 'absolute';
        noBtn.style.left = newX + 'px';
        noBtn.style.top = newY + 'px';
        
        // Change button text
        noBtn.textContent = sweetMessages[messageIndex % sweetMessages.length];
        messageIndex++;
        noClickCount++;
    } else {
        // Fallback: just change text if no safe zones
        noBtn.textContent = sweetMessages[messageIndex % sweetMessages.length];
        messageIndex++;
    }
}

// Utility function to navigate to specific pages
function navigateToPage(pageNumber) {
    const pages = [
        "index.html",
        "page2.html", 
        "page3.html",
        "page4.html",
        "page5.html"
    ];
    
    if (pageNumber >= 1 && pageNumber <= pages.length) {
        window.location.href = pages[pageNumber - 1];
    }
}

// Function to update page configuration (useful for future modifications)
function updatePageConfig(newNextPage, newTotalPages) {
    if (newNextPage) pageConfig.nextPage = newNextPage;
    if (newTotalPages) pageConfig.totalPages = newTotalPages;
}

// Add some floating animation to the hearts
document.addEventListener('DOMContentLoaded', function() {
    const hearts = document.querySelectorAll('.heart');
    hearts.forEach((heart, index) => {
        // Randomize initial positions and animations
        heart.style.top = Math.random() * 100 + 'vh';
        heart.style.animationDelay = (Math.random() * 5) + 's';
        heart.style.animationDuration = (4 + Math.random() * 4) + 's';
    });
    
    // Update the No button to use the better function
    const noBtn = document.getElementById('noBtn');
    noBtn.setAttribute('onmouseover', 'moveNoButtonSimple()');
    
    console.log(`💝 Welcome to page 1 of ${pageConfig.totalPages}`);
    console.log(`➡️ Next page: ${pageConfig.nextPage}`);
});