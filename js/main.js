// Initialize AOS animation library
AOS.init({
  duration: 1000,
  once: true,
  offset: 100
});

// Header scroll effect
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav-menu') && navLinks.classList.contains('active')) {
    navLinks.classList.remove('active');
  }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
      // Close mobile menu after clicking
      navLinks.classList.remove('active');
    }
  });
});

// Add animation to stats when they come into view
const stats = document.querySelectorAll('.stat-item h3');
const animateStats = () => {
  stats.forEach(stat => {
    const value = parseInt(stat.textContent);
    let current = 0;
    const increment = value / 30;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        clearInterval(timer);
        stat.textContent = value + (stat.textContent.includes('x') ? 'x' : '%');
      } else {
        stat.textContent = Math.round(current) + (stat.textContent.includes('x') ? 'x' : '%');
      }
    }, 50);
  });
};

// Trigger stats animation when in view
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateStats();
      observer.unobserve(entry.target);
    }
  });
});

const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
  observer.observe(statsSection);
}

// Animate circle items on scroll
const circleItems = document.querySelectorAll('.circle-item');
circleItems.forEach((item, index) => {
  item.style.transitionDelay = `${index * 0.2}s`;
});

// Optional: Add hover effect to circle items
circleItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.transform = 'scale(1.05)';
    item.style.transition = 'transform 0.3s ease';
  });
  
  item.addEventListener('mouseleave', () => {
    item.style.transform = 'scale(1)';
  });
}); 