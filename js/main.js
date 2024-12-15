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

// Add smooth parallax effect
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.solution-image');
  
  parallaxElements.forEach(element => {
    const speed = 0.5;
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Add tilt effect to cards
const cards = document.querySelectorAll('.challenge-card');
cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  });
});

// Add scroll indicator functionality
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
  scrollIndicator.addEventListener('click', () => {
    const nextSection = document.querySelector('#challenge');
    nextSection.scrollIntoView({ behavior: 'smooth' });
  });
}

// Add dynamic text effect to hero title
const heroTitle = document.querySelector('.hero h1');
if (heroTitle) {
  const text = heroTitle.textContent;
  heroTitle.innerHTML = text.split('').map(char => 
    `<span style="display: inline-block; animation: float ${Math.random() * 2 + 1}s ease-in-out infinite">${char}</span>`
  ).join('');
}

// Counter animation function
function animateCounter(counter) {
  const target = parseInt(counter.getAttribute('data-target'));
  const duration = 2000; // 2 seconds
  const steps = 50;
  const stepValue = target / steps;
  let current = 0;
  
  const timer = setInterval(() => {
    current += stepValue;
    if (current >= target) {
      counter.textContent = target;
      clearInterval(timer);
    } else {
      counter.textContent = Math.round(current);
    }
  }, duration / steps);
}

// Intersection Observer for counters
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('.counter');
      counters.forEach(counter => animateCounter(counter));
      counterObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.5
});

// Observe stats container
const statsContainer = document.querySelector('.hero-stats-container');
if (statsContainer) {
  counterObserver.observe(statsContainer);
} 