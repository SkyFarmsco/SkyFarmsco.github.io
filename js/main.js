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

// Create Intersection Observer for stats
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('.counter');
      counters.forEach(counter => animateCounter(counter));
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

// Observe stats container
const statsContainer = document.querySelector('.hero-stats');
if (statsContainer) {
  statsObserver.observe(statsContainer);
}

// Smooth scroll for navigation
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

// Add scroll indicator functionality
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
  scrollIndicator.addEventListener('click', () => {
    const nextSection = document.querySelector('#challenge');
    nextSection.scrollIntoView({ behavior: 'smooth' });
  });
}

// At the top of main.js, initialize EmailJS
(function() {
  emailjs.init("XCp6619L0--fbgEbj"); // Your public key is correctly set
})();

// Add these variables at the top of your file
const contactForm = document.querySelector('.contact-form');
const submitButton = contactForm.querySelector('button[type="submit"]');

// Update the form submission handling
contactForm.addEventListener('submit', async function(event) {
    // Prevent default form submission behavior
    event.preventDefault();
    event.stopPropagation();
    
    try {
        // Show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="btn-text">Sending...</span>';
        
        const templateParams = {
            from_name: this.user_name.value,
            from_email: this.user_email.value,
            message: this.message.value,
            to_name: 'SkyFarms'
        };

        // Use Promise with timeout to handle the EmailJS send
        const response = await Promise.race([
            emailjs.send('service_ecua0zk', 'template_nmkfmwm', templateParams),
            new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Request timeout')), 10000)
            )
        ]);

        console.log('SUCCESS!', response.status, response.text);
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        this.reset();
        
    } catch (error) {
        console.error('FAILED...', error);
        showNotification('Failed to send message. Please try again.', 'error');
        
    } finally {
        // Reset button state
        submitButton.disabled = false;
        submitButton.innerHTML = '<span class="btn-text">Send Message</span>';
    }
    
    // Prevent any form submission behavior
    return false;
});

// Also update the button click handler to prevent default behavior
submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
});

// Update the notification function to ensure visibility
function showNotification(message, type) {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Add icon based on type
    const icon = type === 'success' ? 'check-circle' : 'exclamation-circle';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${icon}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Force a reflow to ensure the animation works
    notification.offsetHeight;
    
    // Trigger animation
    requestAnimationFrame(() => {
        notification.classList.add('show');
    });
    
    // Remove after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Add smooth reveal for impact cards
const impactCards = document.querySelectorAll('.impact-card');
impactCards.forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  
  setTimeout(() => {
    card.style.transition = 'all 0.5s ease';
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  }, 200 * index);
});