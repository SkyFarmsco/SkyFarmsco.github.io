document.addEventListener('DOMContentLoaded', () => {
    // Form validation and submission
    const contactForm = document.getElementById('contact-form');
    const submitBtn = contactForm.querySelector('.submit-btn');
    
    // Validation patterns
    const patterns = {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        length: (value, min) => value.length >= parseInt(min)
    };

    // Real-time validation
    contactForm.querySelectorAll('[data-validation]').forEach(input => {
        input.addEventListener('input', () => validateField(input));
        input.addEventListener('blur', () => validateField(input));
    });

    function validateField(field) {
        const validationType = field.dataset.validation;
        const errorElement = field.nextElementSibling;
        let isValid = true;
        let errorMessage = '';

        if (validationType === 'email') {
            isValid = patterns.email.test(field.value);
            errorMessage = 'Please enter a valid email address';
        } else if (validationType === 'length') {
            const minLength = field.dataset.validationLength.split('min')[1];
            isValid = patterns.length(field.value, minLength);
            errorMessage = `Must be at least ${minLength} characters`;
        }

        if (!isValid && field.value) {
            field.classList.add('error');
            errorElement.textContent = errorMessage;
        } else {
            field.classList.remove('error');
            errorElement.textContent = '';
        }

        return isValid;
    }

    // Form submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate all fields
        const fields = contactForm.querySelectorAll('[data-validation]');
        const isValid = Array.from(fields).every(field => validateField(field));

        if (!isValid) return;

        // Show loading state
        submitBtn.classList.add('loading');
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            showNotification('Message sent successfully!', 'success');
            contactForm.reset();
        } catch (error) {
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            submitBtn.classList.remove('loading');
        }
    });

    // Initialize map
    const map = L.map('contact-map').setView([25.2048, 55.2708], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add markers for office locations
    const offices = [
        {
            name: 'Dubai Headquarters',
            coords: [25.2048, 55.2708],
            address: 'Dubai Silicon Oasis'
        },
        {
            name: 'Innovation Center',
            coords: [25.1972, 55.2744],
            address: 'Dubai Science Park'
        }
    ];

    offices.forEach(office => {
        const marker = L.marker(office.coords).addTo(map);
        marker.bindPopup(`
            <strong>${office.name}</strong><br>
            ${office.address}
        `);
    });
}); 