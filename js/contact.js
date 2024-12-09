class ContactManager {
    constructor() {
        this.currentStep = 1;
        this.map = null;
        this.init();
    }

    init() {
        this.initializeFormSteps();
        this.initializeValidation();
        this.initializeMap();
        this.initializeInfoTabs();
        this.initializeFileUpload();
    }

    initializeFormSteps() {
        const form = document.getElementById('contact-form');
        const nextBtn = form?.querySelector('.next-step');
        const prevBtn = form?.querySelector('.prev-step');
        const submitBtn = form?.querySelector('.submit-btn');
        const progressSteps = document.querySelectorAll('.progress-step');

        nextBtn?.addEventListener('click', () => {
            if (this.validateCurrentStep()) {
                this.currentStep++;
                this.updateFormStep();
            }
        });

        prevBtn?.addEventListener('click', () => {
            this.currentStep--;
            this.updateFormStep();
        });

        form?.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (this.validateCurrentStep()) {
                await this.submitForm(form);
            }
        });
    }

    updateFormStep() {
        const formSteps = document.querySelectorAll('.form-step');
        const progressSteps = document.querySelectorAll('.progress-step');
        const prevBtn = document.querySelector('.prev-step');
        const nextBtn = document.querySelector('.next-step');
        const submitBtn = document.querySelector('.submit-btn');

        formSteps.forEach((step, index) => {
            if (index + 1 === this.currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });

        progressSteps.forEach((step, index) => {
            if (index + 1 <= this.currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });

        // Update buttons visibility
        prevBtn.style.display = this.currentStep > 1 ? 'block' : 'none';
        nextBtn.style.display = this.currentStep < 3 ? 'block' : 'none';
        submitBtn.style.display = this.currentStep === 3 ? 'block' : 'none';
    }

    initializeValidation() {
        const form = document.getElementById('contact-form');
        const fields = form?.querySelectorAll('[data-validation]');

        fields?.forEach(field => {
            field.addEventListener('input', () => this.validateField(field));
            field.addEventListener('blur', () => this.validateField(field));
        });
    }

    validateField(field) {
        const validationType = field.dataset.validation;
        const errorElement = field.nextElementSibling;
        let isValid = true;
        let errorMessage = '';

        switch (validationType) {
            case 'email':
                isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
                errorMessage = 'Please enter a valid email address';
                break;
            case 'length':
                const minLength = parseInt(field.dataset.validationLength.split('min')[1]);
                isValid = field.value.length >= minLength;
                errorMessage = `Must be at least ${minLength} characters`;
                break;
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

    validateCurrentStep() {
        const currentFields = document.querySelectorAll(`.form-step[data-step="${this.currentStep}"] [data-validation]`);
        return Array.from(currentFields).every(field => this.validateField(field));
    }

    async submitForm(form) {
        const submitBtn = form.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');

        try {
            submitBtn.disabled = true;
            btnText.style.opacity = '0';
            btnLoader.style.display = 'block';

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            this.showNotification('Message sent successfully!', 'success');
            form.reset();
            this.currentStep = 1;
            this.updateFormStep();
        } catch (error) {
            this.showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            submitBtn.disabled = false;
            btnText.style.opacity = '1';
            btnLoader.style.display = 'none';
        }
    }

    initializeMap() {
        if (!document.getElementById('contact-map')) return;

        this.map = L.map('contact-map').setView([25.2048, 55.2708], 13);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);

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
            const marker = L.marker(office.coords).addTo(this.map);
            marker.bindPopup(`
                <strong>${office.name}</strong><br>
                ${office.address}
            `);
        });
    }

    initializeInfoTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const infoPanels = document.querySelectorAll('.info-card');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.dataset.tab;

                tabButtons.forEach(btn => btn.classList.remove('active'));
                infoPanels.forEach(panel => panel.classList.add('hidden'));

                button.classList.add('active');
                document.getElementById(targetTab)?.classList.remove('hidden');
            });
        });
    }

    initializeFileUpload() {
        const fileInput = document.getElementById('attachments');
        if (!fileInput) return;

        fileInput.addEventListener('change', () => {
            const files = Array.from(fileInput.files);
            const maxSize = 10 * 1024 * 1024; // 10MB

            files.forEach(file => {
                if (file.size > maxSize) {
                    this.showNotification('File size exceeds 10MB limit', 'error');
                    fileInput.value = '';
                }
            });
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 10);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize the contact manager
document.addEventListener('DOMContentLoaded', () => {
    new ContactManager();
}); 