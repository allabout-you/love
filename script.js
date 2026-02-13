// Website Untuk Dia - Interactive Script (Final)
// Modified: Skip page 12a,直接从 page 12 ke page 13

document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    let currentPage = 1;
    const totalPages = 16; // Tetap 16 halaman total
    let musicPlaying = true;
    let touchStartX = 0;
    let touchStartY = 0;
    
    // Initialize music
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');
    
    // Create navigation dots
    createNavigationDots();
    
    // Initialize first page
    showPage(currentPage);
    updateProgressBar();
    
    // Try to play music automatically (with user interaction)
    document.body.addEventListener('click', function initMusic() {
        if (musicPlaying && backgroundMusic) {
            backgroundMusic.volume = 0.5;
            backgroundMusic.play().catch(e => console.log("Autoplay prevented:", e));
        }
        document.body.removeEventListener('click', initMusic);
    }, { once: true });
    
    // Music toggle functionality
    musicToggle.addEventListener('click', function() {
        if (musicPlaying) {
            backgroundMusic.pause();
            musicToggle.innerHTML = '<i class="fas fa-music"></i> <span>Music: OFF</span>';
            musicPlaying = false;
        } else {
            backgroundMusic.play();
            musicToggle.innerHTML = '<i class="fas fa-music"></i> <span>Music: ON</span>';
            musicPlaying = true;
        }
    });
    
    // Event delegation untuk button proposal
    document.addEventListener('click', function(e) {
        // Handle proposal buttons
        if (e.target.closest('#page13 .btn-proposal-yes') || 
            e.target.closest('#btnYes')) {
            e.preventDefault();
            e.stopPropagation();
            showResponse('yes');
        }
        
        if (e.target.closest('#page13 .btn-proposal-think') || 
            e.target.closest('#btnThink')) {
            e.preventDefault();
            e.stopPropagation();
            showResponse('think');
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
            e.preventDefault();
            nextPage();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            prevPage();
        }
    });
    
    // Touch/swipe support for mobile
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    });
    
    document.addEventListener('touchend', function(e) {
        const touchEndX = e.changedTouches[0].screenX;
        const touchEndY = e.changedTouches[0].screenY;
        
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;
        
        // Only consider horizontal swipes (not vertical scrolls)
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 30) {
            if (diffX > 0) {
                // Swipe left = next page
                nextPage();
            } else {
                // Swipe right = previous page
                prevPage();
            }
        }
    });
    
    // Function to create navigation dots
    function createNavigationDots() {
        const dotsContainer = document.querySelector('.navigation-dots');
        if (!dotsContainer) return;
        
        for (let i = 1; i <= totalPages; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            if (i === 1) dot.classList.add('active');
            dot.dataset.page = i;
            
            dot.addEventListener('click', function() {
                goToPage(parseInt(this.dataset.page));
            });
            
            dotsContainer.appendChild(dot);
        }
    }
    
    // Function to update navigation dots
    function updateNavigationDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach(dot => {
            dot.classList.remove('active');
            
            // Handle special cases
            let pageNum = parseInt(dot.dataset.page);
            
            // Skip page 12a in navigation dots
            if (currentPage === pageNum) {
                dot.classList.add('active');
            }
            
            // Handle transition between page 12 and 13
            if (currentPage === 12 && pageNum === 12) {
                dot.classList.add('active');
            } else if (currentPage === 13 && pageNum === 13) {
                dot.classList.add('active');
            }
        });
    }
    
    // Function to update progress bar
    function updateProgressBar() {
        let progress = (currentPage / totalPages) * 100;
        const progressBar = document.getElementById('progressBar');
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
    }
    
    // Function to show a specific page
    function showPage(pageNumber) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show the requested page
        const pageId = `page${pageNumber}`;
        const pageToShow = document.getElementById(pageId);
        
        if (pageToShow) {
            pageToShow.classList.add('active');
            currentPage = pageNumber;
            
            // Scroll to top of the page content
            setTimeout(() => {
                if (pageToShow.querySelector('.page-content')) {
                    pageToShow.querySelector('.page-content').scrollTop = 0;
                }
                pageToShow.scrollTop = 0;
            }, 50);
            
            // Special handling for page 14 (response page)
            if (pageNumber === 14) {
                // Check if a response was already selected
                const response = localStorage.getItem('userResponse');
                if (response) {
                    showResponse(response);
                }
            }
            
            // Special handling for page 13 (proposal)
            if (pageNumber === 13) {
                // Clear any previous response
                localStorage.removeItem('userResponse');
            }
        }
        
        updateNavigationDots();
        updateProgressBar();
    }
    
    // Function to go to a specific page
    function goToPage(pageNumber) {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            // Skip page 12a in navigation
            if (pageNumber === 13 && currentPage === 12) {
                // Jika dari page 12 ke page 13, langsung
                currentPage = 13;
                showPage(13);
            } else if (pageNumber === 12 && currentPage === 13) {
                // Jika dari page 13 ke page 12, langsung
                currentPage = 12;
                showPage(12);
            } else {
                currentPage = pageNumber;
                showPage(currentPage);
            }
        }
    }
    
    // Function to go to next page (MODIFIED - skip page 12a)
    window.nextPage = function() {
        if (currentPage === 12) {
            // From page 12 langsung ke page 13 (skip page 12a)
            currentPage = 13;
            showPage(13);
        } else if (currentPage < totalPages) {
            currentPage++;
            showPage(currentPage);
        }
    };
    
    // Function to go to previous page (MODIFIED - skip page 12a)
    function prevPage() {
        if (currentPage === 13) {
            // From page 13 langsung kembali ke page 12
            currentPage = 12;
            showPage(12);
        } else if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
        }
    }
    
    // Function for page 7 pause message
    window.showMessage = function() {
        const pauseMessage = document.getElementById('pauseMessage');
        if (pauseMessage) {
            pauseMessage.classList.remove('hidden');
        }
    };
    
    // Function for page 13 proposal response
    window.showResponse = function(responseType) {
        console.log('Button clicked! Response:', responseType);
        
        // Save response to localStorage
        localStorage.setItem('userResponse', responseType);
        
        // Hide all responses first
        const responseYes = document.getElementById('response-yes');
        const responseThink = document.getElementById('response-think');
        
        if (responseYes) responseYes.classList.add('hidden');
        if (responseThink) responseThink.classList.add('hidden');
        
        // Show the selected response
        if (responseType === 'yes' && responseYes) {
            responseYes.classList.remove('hidden');
            
            // Add celebration effect
            createCelebrationEffects();
        } else if (responseType === 'think' && responseThink) {
            responseThink.classList.remove('hidden');
        }
        
        // Auto scroll to show response
        setTimeout(() => {
            const pageContent = document.querySelector('#page14 .page-content');
            if (pageContent) {
                pageContent.scrollTop = 0;
            }
        }, 100);
    };
    
    // Function to create celebration effects
    function createCelebrationEffects() {
        const celebrationDiv = document.querySelector('.celebration');
        if (!celebrationDiv) return;
        
        // Create more confetti
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = `${Math.random() * 100}%`;
                confetti.style.backgroundColor = getRandomColor();
                confetti.style.width = `${Math.random() * 8 + 6}px`;
                confetti.style.height = confetti.style.width;
                confetti.style.animationDuration = `${Math.random() * 2 + 2}s`;
                confetti.style.animationDelay = `${Math.random() * 1.5}s`;
                
                celebrationDiv.appendChild(confetti);
                
                // Remove confetti after animation
                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.parentNode.removeChild(confetti);
                    }
                }, 5000);
            }, i * 80);
        }
        
        // Play celebration sound if available
        try {
            const audio = new Audio('https://assets.codepen.io/1468070/celebration.mp3');
            audio.volume = 0.2;
            audio.play().catch(e => console.log("Celebration sound error:", e));
        } catch (e) {
            console.log("Celebration sound not available");
        }
    }
    
    // Helper function for random colors
    function getRandomColor() {
        const colors = ['#5d9cec', '#48c774', '#ff9f43', '#ac92ec', '#ff7eb3'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Function to restart the journey
    window.restartJourney = function() {
        currentPage = 1;
        showPage(currentPage);
        
        // Reset any stored responses
        localStorage.removeItem('userResponse');
    };
    
    // Add some interactive hearts on click (on specific pages)
    document.addEventListener('click', function(e) {
        // Only create hearts on certain pages
        if (currentPage === 2 || currentPage === 13 || currentPage === 14) {
            // Don't create hearts if clicking on buttons
            if (!e.target.closest('button')) {
                createClickHeart(e.clientX, e.clientY);
            }
        }
    });
    
    function createClickHeart(x, y) {
        const heart = document.createElement('div');
        heart.innerHTML = '<i class="fas fa-heart"></i>';
        heart.style.position = 'fixed';
        heart.style.left = `${x - 12}px`;
        heart.style.top = `${y - 12}px`;
        heart.style.color = '#ff7eb3';
        heart.style.fontSize = '24px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '10000';
        heart.style.animation = 'heartFloat 2s forwards';
        
        document.body.appendChild(heart);
        
        // Create CSS for animation if not already present
        if (!document.getElementById('heartFloatAnimation')) {
            const style = document.createElement('style');
            style.id = 'heartFloatAnimation';
            style.textContent = `
                @keyframes heartFloat {
                    0% { opacity: 1; transform: translateY(0) scale(1); }
                    100% { opacity: 0; transform: translateY(-80px) scale(1.3); }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Remove heart after animation
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 2000);
    }
    
    // Initialize any page-specific functionality
    initializePageEffects();
    
    function initializePageEffects() {
        // Valentine hearts animation
        const valentineHearts = document.querySelector('.valentine-hearts');
        if (valentineHearts) {
            const hearts = valentineHearts.querySelectorAll('i');
            hearts.forEach((heart, index) => {
                heart.style.animation = `float 3s infinite ${index * 0.5}s`;
            });
        }
        
        // Welcome illustration animation
        const welcomeIcons = document.querySelector('.welcome-illustration');
        if (welcomeIcons) {
            const icons = welcomeIcons.querySelectorAll('i');
            icons.forEach((icon, index) => {
                icon.style.animation = `float 4s infinite ${index * 0.7}s`;
            });
        }
        
        // Proposal hearts animation
        const proposalHearts = document.querySelector('.proposal-hearts');
        if (proposalHearts) {
            const hearts = proposalHearts.querySelectorAll('i');
            hearts.forEach((heart, index) => {
                heart.style.animation = `float 3s infinite ${index * 0.3}s`;
            });
        }
    }
    
    // Log that the website loaded successfully
    console.log('Website Untuk Dia loaded successfully! ❤️');
    console.log('Total pages:', totalPages);
    console.log('Current page:', currentPage);
    console.log('Navigation: Page 12 -> langsung ke Page 13 (skip page 12a)');
});
