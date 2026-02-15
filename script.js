// Scroll Progress Indicator
const scrollProgress = document.querySelector('.scroll-progress');

// Page Loader
window.addEventListener('load', () => {
    const loader = document.querySelector('.page-loader');
    const body = document.body;
    
    // Add loading class initially
    body.classList.add('loading');
    
    // Hide loader after page loads
    setTimeout(() => {
        loader.classList.add('hidden');
        body.classList.remove('loading');
    }, 1000);
});

// Hamburger Menu Animation
const menuIcon = document.querySelector('.menu-icon');
const fullscreenMenu = document.querySelector('.fullscreen-menu');
const menuLinks = document.querySelectorAll('.menu-link');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('active');
    fullscreenMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

// Close menu when clicking on a link
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('active');
        fullscreenMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// Letter by letter wave effect on menu links
menuLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.classList.add('wave-active');
    });
    
    link.addEventListener('mouseleave', () => {
        link.classList.remove('wave-active');
        link.classList.add('wave-reverse');
        
        // Remove reverse class after animation completes
        setTimeout(() => {
            link.classList.remove('wave-reverse');
        }, 600);
    });
});

function updateScrollProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    
    scrollProgress.style.height = scrollPercentage + '%';
}

window.addEventListener('scroll', updateScrollProgress);
window.addEventListener('load', updateScrollProgress);

// Detect scroll position and change colors for white sections
const navbar = document.querySelector('.navbar');
const scrollIndicator = document.querySelector('.scroll-indicator');
const fixedSocialIcons = document.querySelector('.social-icons');

function updateElementColors() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    
    let isOnWhiteSection = false;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
            const bgColor = window.getComputedStyle(section).backgroundColor;
            // Check if background is white or light (rgb values close to 255)
            if (bgColor.includes('rgb(255, 255, 255)') || bgColor.includes('255,')) {
                isOnWhiteSection = true;
            }
        }
    });
    
    if (isOnWhiteSection) {
        navbar.classList.add('dark-mode');
        scrollIndicator.classList.add('dark-mode');
        fixedSocialIcons.classList.add('dark-mode');
    } else {
        navbar.classList.remove('dark-mode');
        scrollIndicator.classList.remove('dark-mode');
        fixedSocialIcons.classList.remove('dark-mode');
    }
}

window.addEventListener('scroll', updateElementColors);
window.addEventListener('load', updateElementColors);

// Magnetic Effect for Social Icons
const socialIcons = document.querySelectorAll('.social-icon');

socialIcons.forEach(icon => {
    const iconCircle = icon.querySelector('.icon-circle');
    
    icon.addEventListener('mousemove', (e) => {
        const rect = icon.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        
        const tiltVal = 20;
        const rotateX = (y / rect.height) * tiltVal;
        const rotateY = (x / rect.width) * -tiltVal;
        
        const strength = 0.4;
        
        // Animate the icon container with magnetic pull and 3D tilt
        gsap.to(icon, {
            x: x * strength,
            y: y * strength,
            rotationX: rotateX,
            rotationY: rotateY,
            transformPerspective: 500,
            duration: 0.3,
            ease: "power2.out"
        });
        
        // Animate inner circle with parallax effect
        const circleStrength = 0.2;
        gsap.to(iconCircle, {
            x: x * circleStrength,
            y: y * circleStrength,
            duration: 0.3,
            ease: "power2.out"
        });
    });
    
    icon.addEventListener('mouseleave', () => {
        // Reset icon position and rotation
        gsap.to(icon, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            duration: 0.4,
            ease: 'power2.out'
        });
        
        // Reset inner circle
        gsap.to(iconCircle, {
            x: 0,
            y: 0,
            duration: 0.4,
            ease: 'power2.out'
        });
    });
});

// Timeline Scroll Animation
const timelineItems = document.querySelectorAll('.timeline-item');

if (timelineItems.length > 0) {
    // Scroll-triggered animation for timeline items
    const observerOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: '-50px'
    };

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('timeline-visible');
            }
        });
    }, observerOptions);

    // Observe each timeline item
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
}

// Hide fixed social icons when footer is visible
const footer = document.querySelector('.footer');

if (fixedSocialIcons && footer) {
    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Footer is visible - hide fixed icons
                fixedSocialIcons.style.opacity = '0';
                fixedSocialIcons.style.visibility = 'hidden';
                fixedSocialIcons.style.transition = 'opacity 0.4s ease, visibility 0.4s ease';
            } else {
                // Footer is not visible - show fixed icons
                fixedSocialIcons.style.opacity = '1';
                fixedSocialIcons.style.visibility = 'visible';
            }
        });
    }, {
        root: null,
        threshold: 0.1
    });

    footerObserver.observe(footer);
}

// Magnetic Effect for Footer Social Icons
const footerSocialIcons = document.querySelectorAll('.footer-social-icon');

footerSocialIcons.forEach(icon => {
    const iconCircle = icon.querySelector('.icon-circle');
    
    icon.addEventListener('mousemove', (e) => {
        const rect = icon.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        
        const tiltVal = 20;
        const rotateX = (y / rect.height) * tiltVal;
        const rotateY = (x / rect.width) * -tiltVal;
        
        const strength = 0.4;
        
        // Animate the icon container with magnetic pull and 3D tilt
        gsap.to(icon, {
            x: x * strength,
            y: y * strength,
            rotationX: rotateX,
            rotationY: rotateY,
            transformPerspective: 500,
            duration: 0.3,
            ease: "power2.out"
        });
        
        // Animate inner circle with parallax effect
        const circleStrength = 0.2;
        gsap.to(iconCircle, {
            x: x * circleStrength,
            y: y * circleStrength,
            duration: 0.3,
            ease: "power2.out"
        });
    });
    
    icon.addEventListener('mouseleave', () => {
        // Reset icon position and rotation
        gsap.to(icon, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            duration: 0.4,
            ease: 'power2.out'
        });
        
        // Reset inner circle
        gsap.to(iconCircle, {
            x: 0,
            y: 0,
            duration: 0.4,
            ease: 'power2.out'
        });
    });
});

// Smooth Page Transition
const pageTransitionLinks = document.querySelectorAll('.page-transition');

pageTransitionLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetUrl = link.getAttribute('href');
        
        // Fade out animation
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '0';
        }, 10);
        
        // Navigate to new page after fade
        setTimeout(() => {
            window.location.href = targetUrl;
        }, 500);
    });
});

// Fade in on page load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease';
    }, 100);
});
