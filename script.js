// ========================================
// CRAFT POP CULT - JAVASCRIPT
// Interactive elements and smooth scrolling
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // SMOOTH SCROLLING FOR NAVIGATION LINKS
    // ========================================
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========================================
    // NAVBAR SCROLL EFFECT
    // ========================================
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add shadow on scroll
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 16px rgba(197, 163, 224, 0.3)';
        } else {
            navbar.style.boxShadow = '0 2px 8px rgba(197, 163, 224, 0.2)';
        }
        
        lastScroll = currentScroll;
    });
    
    // ========================================
    // INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe tool cards for fade-in effect
    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observe social cards
    const socialCards = document.querySelectorAll('.social-card');
    socialCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // ========================================
    // DYNAMIC SPARKLES (ADDITIONAL EFFECT)
    // ========================================
    function createSparkle() {
        const sparklesContainer = document.querySelector('.sparkles');
        if (!sparklesContainer) return;
        
        const sparkle = document.createElement('span');
        sparkle.className = 'sparkle';
        
        // Random position
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        
        // Random color
        const colors = ['#7FDBF5', '#FFB3D9', '#C5A3E0'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        sparkle.style.background = randomColor;
        sparkle.style.boxShadow = `0 0 10px ${randomColor}`;
        
        sparklesContainer.appendChild(sparkle);
        
        // Remove after animation
        setTimeout(() => {
            sparkle.remove();
        }, 3000);
    }
    
    // Create sparkles periodically
    setInterval(createSparkle, 2000);
    
    // ========================================
    // AFFILIATE LINK TRACKING (OPTIONAL)
    // ========================================
    const affiliateLinks = document.querySelectorAll('.tool-link, .btn[href*="http"]');
    
    affiliateLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const linkText = this.textContent.trim();
            
            // Track with Google Analytics if available
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'Affiliate Link',
                    'event_label': linkText,
                    'value': 1
                });
            }
            
            // Console log for debugging (remove in production)
            console.log('Affiliate link clicked:', linkText);
        });
    });
    
    // ========================================
    // MOBILE MENU TOGGLE (IF NEEDED IN FUTURE)
    // ========================================
    // Placeholder for future hamburger menu implementation
    
    // ========================================
    // CONSOLE WELCOME MESSAGE
    // ========================================
    console.log('%c✨ Welcome to Craft Pop Cult! ✨', 'color: #C5A3E0; font-size: 20px; font-weight: bold;');
    console.log('%cBuilt with 💖 by Mari', 'color: #7FDBF5; font-size: 14px;');
    
});

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
