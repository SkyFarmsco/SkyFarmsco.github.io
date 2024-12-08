document.addEventListener('DOMContentLoaded', () => {
    // MOBILE NAVIGATION TOGGLE
    const burgerMenu = document.getElementById('burger-menu');
    const navLinks = document.querySelector('.nav-links');

    burgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // OPTIONAL: SMOOTH SCROLLING FOR NAV LINKS
    const links = document.querySelectorAll('.nav-links a[href^="#"]');
    for (const link of links) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetID = link.getAttribute('href');
            const targetElement = document.querySelector(targetID);

            if (targetElement) {
                // Close mobile menu if open
                navLinks.classList.remove('active');

                // Smooth scroll into view
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // OPTIONAL: BASIC FORM VALIDATION EXAMPLE
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            const name = contactForm.querySelector('#name');
            const email = contactForm.querySelector('#email');
            const message = contactForm.querySelector('#message');

            // Simple validation checks
            if (name.value.trim() === '' || email.value.trim() === '' || message.value.trim() === '') {
                e.preventDefault();
                alert('Please fill in all required fields.');
            } else if (!validateEmail(email.value)) {
                e.preventDefault();
                alert('Please enter a valid email address.');
            }
        });
    }

    function validateEmail(email) {
        // Basic email validation regex
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // Add after DOMContentLoaded event handler
    const observerOptions = {
        threshold: 0.2,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    document.querySelectorAll('.feature, .tech-item, .solution, .team-member, .stat').forEach(
        (element) => observer.observe(element)
    );

    // Update burger menu
    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Add scroll-to-top functionality
    const scrollTopBtn = document.getElementById('scroll-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
