class CareersManager {
    constructor() {
        this.currentFilters = {
            department: 'all',
            location: 'all',
            type: 'all',
            search: ''
        };
        this.init();
    }

    init() {
        this.initializeFilters();
        this.initializeJobCards();
        this.initializeHiringProcess();
        this.initializeTalentForm();
        this.initializeCultureSection();
    }

    initializeFilters() {
        // Search functionality
        const searchInput = document.querySelector('#job-search');
        const clearSearchBtn = document.querySelector('.clear-search');

        searchInput?.addEventListener('input', (e) => {
            this.currentFilters.search = e.target.value.toLowerCase();
            if (e.target.value) {
                clearSearchBtn.style.display = 'block';
            } else {
                clearSearchBtn.style.display = 'none';
            }
            this.filterJobs();
        });

        // Department filters
        document.querySelectorAll('.filter-btn').forEach(button => {
            button.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(btn => 
                    btn.classList.remove('active'));
                button.classList.add('active');
                this.currentFilters.department = button.dataset.department;
                this.filterJobs();
            });
        });

        // Location and type filters
        const locationSelect = document.querySelector('#location-select');
        const typeSelect = document.querySelector('#type-select');

        locationSelect?.addEventListener('change', (e) => {
            this.currentFilters.location = e.target.value;
            this.filterJobs();
        });

        typeSelect?.addEventListener('change', (e) => {
            this.currentFilters.type = e.target.value;
            this.filterJobs();
        });
    }

    filterJobs() {
        const jobCards = document.querySelectorAll('.job-card');
        let visibleCount = 0;

        jobCards.forEach(card => {
            const title = card.querySelector('.job-title').textContent.toLowerCase();
            const description = card.querySelector('.job-description').textContent.toLowerCase();
            const department = card.dataset.department;
            const location = card.querySelector('.job-location').textContent.toLowerCase();
            const type = card.querySelector('.job-type').textContent.toLowerCase();

            const matchesSearch = title.includes(this.currentFilters.search) || 
                                description.includes(this.currentFilters.search);
            const matchesDepartment = this.currentFilters.department === 'all' || 
                                    department === this.currentFilters.department;
            const matchesLocation = this.currentFilters.location === 'all' || 
                                  location.includes(this.currentFilters.location.toLowerCase());
            const matchesType = this.currentFilters.type === 'all' || 
                              type.includes(this.currentFilters.type.toLowerCase());

            if (matchesSearch && matchesDepartment && matchesLocation && matchesType) {
                card.style.display = 'block';
                this.animateCard(card, visibleCount);
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        this.updateNoResults(visibleCount === 0);
    }

    initializeJobCards() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('apply-btn')) {
                const jobCard = e.target.closest('.job-card');
                this.openApplicationModal(jobCard);
            }
        });
    }

    initializeHiringProcess() {
        const processSteps = document.querySelectorAll('.process-step');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.5 });

        processSteps.forEach(step => observer.observe(step));
    }

    initializeTalentForm() {
        const form = document.querySelector('.talent-form');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.disabled = true;

            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                this.showNotification('Successfully joined talent community!', 'success');
                form.reset();
            } catch (error) {
                this.showNotification('Failed to join. Please try again.', 'error');
            } finally {
                submitBtn.disabled = false;
            }
        });
    }

    initializeCultureSection() {
        const cultureCards = document.querySelectorAll('.culture-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                }
            });
        }, { threshold: 0.2 });

        cultureCards.forEach(card => observer.observe(card));
    }

    animateCard(card, index) {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('animate-fade-in');
    }

    updateNoResults(show) {
        const noResults = document.querySelector('.no-results');
        if (!noResults) return;

        if (show) {
            noResults.style.display = 'flex';
            noResults.classList.add('animate-fade-in');
        } else {
            noResults.style.display = 'none';
            noResults.classList.remove('animate-fade-in');
        }
    }

    openApplicationModal(jobCard) {
        const modal = document.createElement('div');
        modal.className = 'modal application-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <div class="application-content">
                    <h2>Apply for ${jobCard.querySelector('.job-title').textContent}</h2>
                    <form class="application-form">
                        <div class="form-group">
                            <label for="name">Full Name *</label>
                            <input type="text" id="name" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email *</label>
                            <input type="email" id="email" required>
                        </div>
                        <div class="form-group">
                            <label for="resume">Resume/CV *</label>
                            <input type="file" id="resume" accept=".pdf,.doc,.docx" required>
                        </div>
                        <div class="form-group">
                            <label for="cover-letter">Cover Letter</label>
                            <textarea id="cover-letter" rows="4"></textarea>
                        </div>
                        <button type="submit" class="btn submit-btn">Submit Application</button>
                    </form>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        const closeBtn = modal.querySelector('.close-modal');
        const form = modal.querySelector('form');

        closeBtn.addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('.submit-btn');
            submitBtn.disabled = true;

            try {
                await new Promise(resolve => setTimeout(resolve, 1500));
                this.showNotification('Application submitted successfully!', 'success');
                modal.remove();
            } catch (error) {
                this.showNotification('Failed to submit application', 'error');
            } finally {
                submitBtn.disabled = false;
            }
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

// Initialize the careers manager
document.addEventListener('DOMContentLoaded', () => {
    new CareersManager();
}); 