// // Website Untuk Dia - Interactive Script

// document.addEventListener('DOMContentLoaded', function() {
//     // Initialize variables
//     let currentPage = 1;
//     const totalPages = 15;
//     let musicPlaying = true;
    
//     // Initialize music
//     const backgroundMusic = document.getElementById('backgroundMusic');
//     const musicToggle = document.getElementById('musicToggle');
    
//     // Try to play music automatically (with user interaction)
//     document.body.addEventListener('click', function initMusic() {
//         if (musicPlaying) {
//             backgroundMusic.play().catch(e => console.log("Autoplay prevented:", e));
//         }
//         document.body.removeEventListener('click', initMusic);
//     }, { once: true });
    
//     // Music toggle functionality
//     musicToggle.addEventListener('click', function() {
//         if (musicPlaying) {
//             backgroundMusic.pause();
//             musicToggle.innerHTML = '<i class="fas fa-music"></i> <span>Music: OFF</span>';
//             musicPlaying = false;
//         } else {
//             backgroundMusic.play();
//             musicToggle.innerHTML = '<i class="fas fa-music"></i> <span>Music: ON</span>';
//             musicPlaying = true;
//         }
//     });
    
//     // Create navigation dots
//     createNavigationDots();
    
//     // Initialize first page
//     showPage(currentPage);
//     updateProgressBar();
    
//     // Keyboard navigation
//     document.addEventListener('keydown', function(e) {
//         if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
//             e.preventDefault();
//             nextPage();
//         } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
//             e.preventDefault();
//             prevPage();
//         }
//     });
    
//     // Touch/swipe support for mobile
//     let touchStartX = 0;
//     let touchStartY = 0;
    
//     document.addEventListener('touchstart', function(e) {
//         touchStartX = e.changedTouches[0].screenX;
//         touchStartY = e.changedTouches[0].screenY;
//     });
    
//     document.addEventListener('touchend', function(e) {
//         const touchEndX = e.changedTouches[0].screenX;
//         const touchEndY = e.changedTouches[0].screenY;
        
//         const diffX = touchStartX - touchEndX;
//         const diffY = touchStartY - touchEndY;
        
//         // Only consider horizontal swipes (not vertical scrolls)
//         if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 30) {
//             if (diffX > 0) {
//                 // Swipe left
//                 nextPage();
//             } else {
//                 // Swipe right
//                 prevPage();
//             }
//         }
//     });
    
//     // Function to create navigation dots
//     function createNavigationDots() {
//         const dotsContainer = document.querySelector('.navigation-dots');
        
//         for (let i = 1; i <= totalPages; i++) {
//             const dot = document.createElement('div');
//             dot.className = 'dot';
//             if (i === 1) dot.classList.add('active');
//             dot.dataset.page = i;
            
//             dot.addEventListener('click', function() {
//                 goToPage(parseInt(this.dataset.page));
//             });
            
//             dotsContainer.appendChild(dot);
//         }
//     }
    
//     // Function to update navigation dots
//     function updateNavigationDots() {
//         const dots = document.querySelectorAll('.dot');
//         dots.forEach(dot => {
//             dot.classList.remove('active');
//             if (parseInt(dot.dataset.page) === currentPage) {
//                 dot.classList.add('active');
//             }
//         });
//     }
    
//     // Function to update progress bar
//     function updateProgressBar() {
//         const progress = (currentPage / totalPages) * 100;
//         document.getElementById('progressBar').style.width = `${progress}%`;
//     }
    
//     // Function to show a specific page
//     function showPage(pageNumber) {
//         // Hide all pages
//         document.querySelectorAll('.page').forEach(page => {
//             page.classList.remove('active');
//         });
        
//         // Show the requested page
//         const pageToShow = document.getElementById(`page${pageNumber}`);
//         if (pageToShow) {
//             pageToShow.classList.add('active');
            
//             // Scroll to top of the page
//             pageToShow.scrollTop = 0;
            
//             // Special handling for page 14 (response page)
//             if (pageNumber === 14) {
//                 // Check if a response was already selected
//                 const response = localStorage.getItem('userResponse');
//                 if (response) {
//                     showResponse(response);
//                 }
//             }
            
//             // Special handling for page 13 (proposal)
//             if (pageNumber === 13) {
//                 // Clear any previous response
//                 localStorage.removeItem('userResponse');
//             }
//         }
        
//         updateNavigationDots();
//         updateProgressBar();
//     }
    
//     // Function to go to a specific page
//     function goToPage(pageNumber) {
//         if (pageNumber >= 1 && pageNumber <= totalPages) {
//             currentPage = pageNumber;
//             showPage(currentPage);
//         }
//     }
    
//     // Function to go to next page
//     window.nextPage = function() {
//         if (currentPage < totalPages) {
//             currentPage++;
//             showPage(currentPage);
//         }
//     };
    
//     // Function to go to previous page
//     function prevPage() {
//         if (currentPage > 1) {
//             currentPage--;
//             showPage(currentPage);
//         }
//     }
    
//     // Function for page 7 pause message
//     window.showMessage = function() {
//         document.getElementById('pauseMessage').classList.remove('hidden');
//     };
    
//     // Function for page 13 proposal response
//     window.showResponse = function(responseType) {
//         // Save response to localStorage
//         localStorage.setItem('userResponse', responseType);
        
//         // Hide all responses first
//         document.getElementById('response-yes').classList.add('hidden');
//         document.getElementById('response-think').classList.add('hidden');
        
//         // Show the selected response
//         if (responseType === 'yes') {
//             document.getElementById('response-yes').classList.remove('hidden');
            
//             // Add celebration effect
//             createCelebrationEffects();
//         } else if (responseType === 'think') {
//             document.getElementById('response-think').classList.remove('hidden');
//         }
//     };
    
//     // Function to create celebration effects
//     function createCelebrationEffects() {
//         const celebrationDiv = document.querySelector('.celebration');
        
//         // Create more confetti
//         for (let i = 0; i < 20; i++) {
//             setTimeout(() => {
//                 const confetti = document.createElement('div');
//                 confetti.className = 'confetti';
//                 confetti.style.left = `${Math.random() * 100}%`;
//                 confetti.style.backgroundColor = getRandomColor();
//                 confetti.style.width = `${Math.random() * 10 + 10}px`;
//                 confetti.style.height = confetti.style.width;
//                 confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
//                 confetti.style.animationDelay = `${Math.random() * 2}s`;
                
//                 celebrationDiv.appendChild(confetti);
                
//                 // Remove confetti after animation
//                 setTimeout(() => {
//                     if (confetti.parentNode) {
//                         confetti.parentNode.removeChild(confetti);
//                     }
//                 }, 5000);
//             }, i * 100);
//         }
        
//         // Play celebration sound if available
//         try {
//             const audio = new Audio('https://assets.codepen.io/1468070/celebration.mp3');
//             audio.volume = 0.3;
//             audio.play();
//         } catch (e) {
//             console.log("Celebration sound not available");
//         }
//     }
    
//     // Helper function for random colors
//     function getRandomColor() {
//         const colors = ['#ff006e', '#3a86ff', '#52b788', '#ff9f1c', '#8338ec'];
//         return colors[Math.floor(Math.random() * colors.length)];
//     }
    
//     // Function to restart the journey
//     window.restartJourney = function() {
//         currentPage = 1;
//         showPage(currentPage);
        
//         // Reset any stored responses
//         localStorage.removeItem('userResponse');
//     };
    
//     // Add some interactive hearts on click
//     document.addEventListener('click', function(e) {
//         // Only create hearts on certain pages
//         if (currentPage === 2 || currentPage === 13 || currentPage === 14) {
//             createClickHeart(e.clientX, e.clientY);
//         }
//     });
    
//     function createClickHeart(x, y) {
//         const heart = document.createElement('div');
//         heart.innerHTML = '<i class="fas fa-heart"></i>';
//         heart.style.position = 'fixed';
//         heart.style.left = `${x - 15}px`;
//         heart.style.top = `${y - 15}px`;
//         heart.style.color = '#ff6b8b';
//         heart.style.fontSize = '30px';
//         heart.style.pointerEvents = 'none';
//         heart.style.zIndex = '10000';
//         heart.style.animation = 'heartFloat 2s forwards';
        
//         document.body.appendChild(heart);
        
//         // Create CSS for animation if not already present
//         if (!document.getElementById('heartFloatAnimation')) {
//             const style = document.createElement('style');
//             style.id = 'heartFloatAnimation';
//             style.textContent = `
//                 @keyframes heartFloat {
//                     0% { opacity: 1; transform: translateY(0) scale(1); }
//                     100% { opacity: 0; transform: translateY(-100px) scale(1.5); }
//                 }
//             `;
//             document.head.appendChild(style);
//         }
        
//         // Remove heart after animation
//         setTimeout(() => {
//             if (heart.parentNode) {
//                 heart.parentNode.removeChild(heart);
//             }
//         }, 2000);
//     }
    
//     // Initialize any page-specific functionality
//     initializePageEffects();
    
//     function initializePageEffects() {
//         // Valentine hearts animation
//         const valentineHearts = document.querySelector('.valentine-hearts');
//         if (valentineHearts) {
//             const hearts = valentineHearts.querySelectorAll('i');
//             hearts.forEach((heart, index) => {
//                 heart.style.animation = `float 3s infinite ${index * 0.5}s`;
//             });
//         }
        
//         // Welcome illustration animation
//         const welcomeIcons = document.querySelector('.welcome-illustration');
//         if (welcomeIcons) {
//             const icons = welcomeIcons.querySelectorAll('i');
//             icons.forEach((icon, index) => {
//                 icon.style.animation = `float 4s infinite ${index * 0.7}s`;
//             });
//         }
//     }
    
//     // Log that the website loaded successfully
//     console.log('Website Untuk Dia loaded successfully! ❤️');
// });

// Website Untuk Dia - Interactive Script

document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    let currentPage = 1;
    const totalPages = 16; // Sekarang 16 halaman (ditambah halaman 12a)
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
        if (musicPlaying) {
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
            
            // Handle special case for page 12a (it's page 12.5)
            let pageNum = parseInt(dot.dataset.page);
            if (currentPage === 12.5 && pageNum === 13) {
                dot.classList.add('active');
            } else if (currentPage === pageNum) {
                dot.classList.add('active');
            }
        });
    }
    
    // Function to update progress bar
    function updateProgressBar() {
        let progress;
        if (currentPage === 12.5) {
            progress = (12.5 / totalPages) * 100;
        } else {
            progress = (currentPage / totalPages) * 100;
        }
        document.getElementById('progressBar').style.width = `${progress}%`;
    }
    
    // Function to show a specific page
    function showPage(pageNumber) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Handle special case for page 12a
        let pageId;
        if (pageNumber === 12.5 || pageNumber === '12a') {
            pageId = 'page12a';
            currentPage = 12.5;
        } else {
            pageId = `page${pageNumber}`;
            currentPage = pageNumber;
        }
        
        // Show the requested page
        const pageToShow = document.getElementById(pageId);
        if (pageToShow) {
            pageToShow.classList.add('active');
            
            // Scroll to top of the page
            pageToShow.scrollTop = 0;
            
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
            // Handle page 12a special case
            if (pageNumber === 13) {
                // If user clicks dot 13, we need to check if we should go to 12a or 13
                if (currentPage === 12) {
                    currentPage = 12.5;
                    showPage('12a');
                } else {
                    currentPage = 13;
                    showPage(13);
                }
            } else if (pageNumber === 12) {
                currentPage = 12;
                showPage(12);
            } else {
                currentPage = pageNumber;
                showPage(currentPage);
            }
        }
    }
    
    // Function to go to next page
    window.nextPage = function() {
        if (currentPage === 12) {
            // From page 12 go to page 12a
            currentPage = 12.5;
            showPage('12a');
        } else if (currentPage === 12.5) {
            // From page 12a go to page 13
            currentPage = 13;
            showPage(13);
        } else if (currentPage < totalPages) {
            currentPage++;
            showPage(currentPage);
        }
    };
    
    // Function to go to previous page
    function prevPage() {
        if (currentPage === 13) {
            // From page 13 go to page 12a
            currentPage = 12.5;
            showPage('12a');
        } else if (currentPage === 12.5) {
            // From page 12a go to page 12
            currentPage = 12;
            showPage(12);
        } else if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
        }
    }
    
    // Function for page 7 pause message
    window.showMessage = function() {
        document.getElementById('pauseMessage').classList.remove('hidden');
    };
    
    // Function for page 13 proposal response
    window.showResponse = function(responseType) {
        // Save response to localStorage
        localStorage.setItem('userResponse', responseType);
        
        // Hide all responses first
        document.getElementById('response-yes').classList.add('hidden');
        document.getElementById('response-think').classList.add('hidden');
        
        // Show the selected response
        if (responseType === 'yes') {
            document.getElementById('response-yes').classList.remove('hidden');
            
            // Add celebration effect
            createCelebrationEffects();
        } else if (responseType === 'think') {
            document.getElementById('response-think').classList.remove('hidden');
        }
    };
    
    // Function to create celebration effects
    function createCelebrationEffects() {
        const celebrationDiv = document.querySelector('.celebration');
        if (!celebrationDiv) return;
        
        // Create more confetti
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = `${Math.random() * 100}%`;
                confetti.style.backgroundColor = getRandomColor();
                confetti.style.width = `${Math.random() * 10 + 10}px`;
                confetti.style.height = confetti.style.width;
                confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
                confetti.style.animationDelay = `${Math.random() * 2}s`;
                
                celebrationDiv.appendChild(confetti);
                
                // Remove confetti after animation
                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.parentNode.removeChild(confetti);
                    }
                }, 5000);
            }, i * 100);
        }
        
        // Play celebration sound if available
        try {
            const audio = new Audio('https://assets.codepen.io/1468070/celebration.mp3');
            audio.volume = 0.3;
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
            createClickHeart(e.clientX, e.clientY);
        }
    });
    
    function createClickHeart(x, y) {
        const heart = document.createElement('div');
        heart.innerHTML = '<i class="fas fa-heart"></i>';
        heart.style.position = 'fixed';
        heart.style.left = `${x - 15}px`;
        heart.style.top = `${y - 15}px`;
        heart.style.color = '#ff7eb3';
        heart.style.fontSize = '30px';
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
                    100% { opacity: 0; transform: translateY(-100px) scale(1.5); }
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
});
