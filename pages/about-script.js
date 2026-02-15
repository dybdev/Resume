// Skill Bar Animation on Scroll
document.addEventListener('DOMContentLoaded', function() {
    const skillBars = document.querySelectorAll('.skill-bar-item');
    
    // Set the width based on data-progress attribute
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const progressFill = bar.querySelector('.skill-progress-fill');
            const progress = progressFill.getAttribute('data-progress');
            
            // Check if element is in viewport
            const rect = bar.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
            
            if (isVisible && !bar.classList.contains('animate')) {
                bar.classList.add('animate');
                progressFill.style.setProperty('--progress-width', progress + '%');
            }
        });
    }
    
    // Initial check
    animateSkillBars();
    
    // Check on scroll
    window.addEventListener('scroll', animateSkillBars);
    
    // Smooth fade-in for profile section
    const profileSection = document.querySelector('.profile');
    if (profileSection) {
        setTimeout(() => {
            profileSection.style.opacity = '1';
            profileSection.style.transform = 'translateY(0)';
        }, 100);
    }
});
