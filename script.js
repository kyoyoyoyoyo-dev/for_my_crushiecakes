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
    nextPage: "page2.html",
    totalPages: 5
};

let messageIndex = 0;
let noClickCount = 0;

// Display scaling and responsive setup
function initializeResponsiveDesign() {
    scaleElements();
    setupFloatingHearts();
    setupButtonScaling();
    
    // Re-scale on window resize
    window.addEventListener('resize', scaleElements);
    window.addEventListener('orientationchange', scaleElements);
}

// Auto-scale elements based on screen size
function scaleElements() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const baseWidth = 1920; // Base design width
    const baseHeight = 1080; // Base design height
    
    // Calculate scale factors
    const scaleX = Math.min(screenWidth / baseWidth, 1);
    const scaleY = Math.min(screenHeight / baseHeight, 1);
    const scale = Math.min(scaleX, scaleY) * 0.9; // 90% of calculated scale for safety
    
    // Get all scalable elements
    const containers = document.querySelectorAll('.container, .message-box');
    const titles = document.querySelectorAll('.title');
    const subtitles = document.querySelectorAll('.subtitle, .invite-text, .reason-text');
    const buttons = document.querySelectorAll('.btn');
    
    // Apply scaling
    containers.forEach(container => {
        container.style.transform = `scale(${scale})`;
        container.style.transformOrigin = 'center center';
    });
    
    // Scale fonts for very small screens
    if (screenWidth < 768) {
        const mobileScale = screenWidth / 400;
        document.documentElement.style.fontSize = `${Math.max(mobileScale, 0.8)}rem`;
    }
}

// Enhanced floating hearts with responsive behavior
function setupFloatingHearts() {
    const hearts = document.querySelectorAll('.heart');
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    hearts.forEach((heart, index) => {
        // Randomize positions based on screen size
        const left = Math.random() * (screenWidth - 50);
        const top = Math.random() * (screenHeight - 50);
        
        heart.style.left = left + 'px';
        heart.style.top = top + 'vh';
        heart.style.fontSize = getResponsiveFontSize() + 'px';
        heart.style.animationDelay = (Math.random() * 5) + 's';
        heart.style.animationDuration = (4 + Math.random() * 4) + 's';
    });
}

// Get responsive font size based on screen width
function getResponsiveFontSize() {
    const width = window.innerWidth;
    if (width < 480) return 16;      // Mobile
    if (width < 768) return 18;      // Small tablet
    if (width < 1024) return 20;     // Tablet
    if (width < 1440) return 22;     // Small desktop
    return 24;                       // Large desktop
}

// Scale buttons based on screen size
function setupButtonScaling() {
    const buttons = document.querySelectorAll('.btn');
    const screenWidth = window.innerWidth;
    
    buttons.forEach(button => {
        if (screenWidth < 480) {
            button.style.padding = '12px 20px';
            button.style.fontSize = '14px';
            button.style.minWidth = '160px';
        } else if (screenWidth < 768) {
            button.style.padding = '14px 25px';
            button.style.fontSize = '16px';
            button.style.minWidth = '180px';
        } else {
            button.style.padding = '15px 30px';
            button.style.fontSize = '18px';
            button.style.minWidth = '200px';
        }
    });
}

// Enhanced button movement that works on any screen size
function moveNoButtonSimple() {
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.querySelector('.yes-btn');
    const container = document.querySelector('.buttons-container');
    
    if (!noBtn || !yesBtn || !container) return;
    
    const containerRect = container.getBoundingClientRect();
    const yesBtnRect = yesBtn.getBoundingClientRect();
    const noBtnRect = noBtn.getBoundingClientRect();
    
    // Convert to container-relative coordinates
    const yesBtnLeft = yesBtn.offsetLeft;
    const yesBtnTop = yesBtn.offsetTop;
    const yesBtnRight = yesBtnLeft + yesBtn.offsetWidth;
    const yesBtnBottom = yesBtnTop + yesBtn.offsetHeight;
    
    // Define safe zones with responsive padding
    const padding = Math.max(20, containerRect.width * 0.05); // Responsive padding
    
    const safeZones = [
        { // Top
            minX: 0,
            maxX: containerRect.width - noBtn.offsetWidth,
            minY: 0,
            maxY: Math.max(0, yesBtnTop - noBtn.offsetHeight - padding)
        },
        { // Bottom
            minX: 0,
            maxX: containerRect.width - noBtn.offsetWidth,
            minY: Math.min(containerRect.height - noBtn.offsetHeight, yesBtnBottom + padding),
            maxY: containerRect.height - noBtn.offsetHeight
        },
        { // Left
            minX: 0,
            maxX: Math.max(0, yesBtnLeft - noBtn.offsetWidth - padding),
            minY: 0,
            maxY: containerRect.height - noBtn.offsetHeight
        },
        { // Right
            minX: Math.min(containerRect.width - noBtn.offsetWidth, yesBtnRight + padding),
            maxX: containerRect.width - noBtn.offsetWidth,
            minY: 0,
            maxY: containerRect.height - noBtn.offsetHeight
        }
    ];
    
    // Filter valid zones
    const validZones = safeZones.filter(zone => 
        zone.minX <= zone.maxX && zone.minY <= zone.maxY &&
        zone.maxX >= 0 && zone.maxY >= 0
    );
    
    if (validZones.length > 0 && noClickCount < 5) {
        const zone = validZones[Math.floor(Math.random() * validZones.length)];
        const newX = Math.floor(Math.random() * (zone.maxX - zone.minX)) + zone.minX;
        const newY = Math.floor(Math.random() * (zone.maxY - zone.minY)) + zone.minY;
        
        noBtn.style.position = 'absolute';
        noBtn.style.left = Math.max(0, newX) + 'px';
        noBtn.style.top = Math.max(0, newY) + 'px';
        
        noBtn.textContent = sweetMessages[messageIndex % sweetMessages.length];
        messageIndex++;
        noClickCount++;
    } else {
        // Just change text after too many moves or no valid zones
        noBtn.textContent = sweetMessages[messageIndex % sweetMessages.length];
        messageIndex++;
    }
}

// Navigation function with cache busting
function navigateToPage(pageNumber) {
    const pages = [
        "index.html",
        "page2.html", 
        "page3.html",
        "page4.html",
        "page5.html"
    ];
    
    if (pageNumber >= 1 && pageNumber <= pages.length) {
        // Cache busting for reliable navigation
        window.location.href = pages[pageNumber - 1] + '?t=' + Date.now();
    }
}

// Handle yes button click
function handleYes() {
    window.location.href = pageConfig.nextPage + '?t=' + Date.now();
}

// Touch device support
function setupTouchSupport() {
    // Add touch event listeners for mobile
    const noBtn = document.getElementById('noBtn');
    if (noBtn) {
        noBtn.addEventListener('touchstart', function(e) {
            e.preventDefault();
            moveNoButtonSimple();
        });
    }
    
    // Prevent zoom on double-tap
    document.addEventListener('dblclick', function(e) {
        e.preventDefault();
    }, { passive: false });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeResponsiveDesign();
    setupTouchSupport();
    
    console.log('💝 Website initialized with responsive scaling');
    console.log('📱 Screen size:', window.innerWidth, 'x', window.innerHeight);
    
    // Update page config based on current page
    updatePageConfig();
});

// Update page configuration based on current page
function updatePageConfig() {
    const currentPage = window.location.pathname.split('/').pop();
    const pageMap = {
        'index.html': { nextPage: 'page2.html', pageNum: 1 },
        'page2.html': { nextPage: 'page3.html', pageNum: 2 },
        'page3.html': { nextPage: 'page4.html', pageNum: 3 },
        'page4.html': { nextPage: 'page5.html', pageNum: 4 },
        'page5.html': { nextPage: 'index.html', pageNum: 5 }
    };
    
    if (pageMap[currentPage]) {
        pageConfig.nextPage = pageMap[currentPage].nextPage;
        console.log(`📄 Current page: ${pageMap[currentPage].pageNum}, Next: ${pageConfig.nextPage}`);
    }
}

// Utility function to update configuration
function updatePageConfig(newNextPage, newTotalPages) {
    if (newNextPage) pageConfig.nextPage = newNextPage;
    if (newTotalPages) pageConfig.totalPages = newTotalPages;
}

// Make functions globally available
window.navigateToPage = navigateToPage;
window.handleYes = handleYes;
window.moveNoButtonSimple = moveNoButtonSimple;
