// Intersection Observer for scroll animations
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            animationObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

// Observe elements with animation classes
document.querySelectorAll('.animate-on-scroll').forEach(
    element => animationObserver.observe(element)
); 