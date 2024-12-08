document.addEventListener('DOMContentLoaded', () => {
    // Sample job data (in a real app, this would come from an API)
    const jobs = [
        {
            title: 'Senior IoT Engineer',
            type: 'Full-time',
            location: 'Dubai, UAE',
            department: 'engineering',
            description: 'Join our tech team to develop smart farming solutions and IoT systems for vertical farming.',
            posted: '2024-03-15'
        },
        {
            title: 'Plant Scientist',
            type: 'Full-time',
            location: 'Abu Dhabi, UAE',
            department: 'agriculture',
            description: 'Lead research in plant growth optimization and nutrient management systems.',
            posted: '2024-03-14'
        },
        {
            title: 'Operations Manager',
            type: 'Full-time',
            location: 'Dubai, UAE',
            department: 'operations',
            description: 'Oversee daily operations of our vertical farming facilities.',
            posted: '2024-03-13'
        }
        // Add more job listings
    ];

    const jobsGrid = document.querySelector('.jobs-grid');
    const jobTemplate = document.querySelector('#job-card-template');
    const searchInput = document.querySelector('#job-search');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const locationSelect = document.querySelector('#location-select');

    let currentFilters = {
        department: 'all',
        location: 'all',
        search: ''
    };

    // Initialize jobs display
    displayJobs();

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        currentFilters.search = e.target.value.toLowerCase();
        displayJobs();
    });

    // Department filter
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentFilters.department = button.dataset.department;
            displayJobs();
        });
    });

    // Location filter
    locationSelect.addEventListener('change', (e) => {
        currentFilters.location = e.target.value;
        displayJobs();
    });

    function displayJobs() {
        // Clear current jobs
        jobsGrid.innerHTML = '';

        // Filter jobs
        const filteredJobs = jobs.filter(job => {
            const matchesDepartment = currentFilters.department === 'all' || job.department === currentFilters.department;
            const matchesLocation = currentFilters.location === 'all' || job.location.toLowerCase().includes(currentFilters.location.toLowerCase());
            const matchesSearch = job.title.toLowerCase().includes(currentFilters.search) || 
                                job.description.toLowerCase().includes(currentFilters.search);

            return matchesDepartment && matchesLocation && matchesSearch;
        });

        // Display filtered jobs
        filteredJobs.forEach(job => {
            const jobCard = jobTemplate.content.cloneNode(true);
            
            jobCard.querySelector('.job-title').textContent = job.title;
            jobCard.querySelector('.job-type').textContent = job.type;
            jobCard.querySelector('.job-location').textContent = job.location;
            jobCard.querySelector('.job-department').textContent = job.department.charAt(0).toUpperCase() + job.department.slice(1);
            jobCard.querySelector('.job-description').textContent = job.description;
            jobCard.querySelector('.posted-date').textContent = `Posted ${formatDate(job.posted)}`;

            // Add apply button functionality
            jobCard.querySelector('.apply-btn').addEventListener('click', () => {
                openApplicationModal(job);
            });

            jobsGrid.appendChild(jobCard);
        });

        // Show no results message if needed
        if (filteredJobs.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.textContent = 'No matching positions found.';
            jobsGrid.appendChild(noResults);
        }
    }

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    function openApplicationModal(job) {
        const modal = document.getElementById('application-modal');
        const jobTitleSpan = modal.querySelector('.job-title');
        const form = modal.querySelector('#application-form');
        
        jobTitleSpan.textContent = job.title;
        modal.classList.add('active');
        
        // Close modal functionality
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.classList.remove('active');
        });
        
        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
        
        // Form submission
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('.submit-btn');
            submitBtn.classList.add('loading');
            
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                showNotification('Application submitted successfully!', 'success');
                modal.classList.remove('active');
                form.reset();
            } catch (error) {
                showNotification('Failed to submit application. Please try again.', 'error');
            } finally {
                submitBtn.classList.remove('loading');
            }
        });
    }
}); 