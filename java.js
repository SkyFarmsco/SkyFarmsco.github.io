// Initialize AOS with enhanced settings
AOS.init({
    duration: 1200,
    offset: 100,
    once: true,
    mirror: false,
    anchorPlacement: 'top-bottom'
});

// Enhanced Particles.js configuration
particlesJS('particles-js', {
    particles: {
        number: { 
            value: 100,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: { value: '#ffffff' },
        shape: { 
            type: 'circle',
            stroke: {
                width: 0,
                color: '#000000'
            }
        },
        opacity: {
            value: 0.5,
            random: true,
            animation: {
                enable: true,
                speed: 1,
                minimumValue: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: true,
            straight: false,
            outModes: 'out'
        }
    },
    interactivity: {
        detectsOn: 'canvas',
        events: {
            onHover: {
                enable: true,
                mode: 'grab'
            },
            onClick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        }
    }
});

// Enhanced Swiper initialization
const initSliders = () => {
    // Tech Slider
    const techSlider = new Swiper('.tech-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        speed: 1000,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        effect: 'coverflow',
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true
        },
        breakpoints: {
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
        }
    });
};

// Scroll animations and dynamic sections
const initScrollAnimations = () => {
    const nav = document.querySelector('nav');
    const sections = document.querySelectorAll('section');
    const timeline = document.querySelector('.timeline');
    let timelineItems;

    if (timeline) {
        timelineItems = timeline.querySelectorAll('.timeline-item');
    }

    // Intersection Observer for sections
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.opacity = '1';
            }
        });
    }, {
        threshold: 0.2
    });

    sections.forEach(section => {
        section.style.transform = 'translateY(50px)';
        section.style.opacity = '0';
        section.style.transition = 'all 0.6s ease-out';
        sectionObserver.observe(section);
    });

    // Timeline animation
    if (timelineItems) {
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    entry.target.style.transform = 'translateX(0)';
                    entry.target.style.opacity = '1';
                }
            });
        }, {
            threshold: 0.5
        });

        timelineItems.forEach((item, index) => {
            item.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
            item.style.opacity = '0';
            item.style.transition = 'all 0.6s ease-out';
            timelineObserver.observe(item);
        });
    }

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
        });
    }

    // Dynamic navigation
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Navigation background
        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Hide/Show navigation on scroll
        if (currentScroll > lastScroll && currentScroll > 500) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    });
};

// Mobile menu toggle
const initMobileMenu = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        
        // Animate links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger animation
        burger.classList.toggle('toggle');
    });
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initSliders();
    initScrollAnimations();
    initMobileMenu();
});
