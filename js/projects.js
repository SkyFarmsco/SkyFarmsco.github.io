document.addEventListener('DOMContentLoaded', () => {
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const searchInput = document.getElementById('project-search');
    const locationFilter = document.getElementById('location-filter');
    let currentPage = 1;

    // Filter state
    let filters = {
        category: 'all',
        location: 'all',
        search: ''
    };

    // Initialize filtering
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filters.category = button.dataset.filter;
            filterProjects();
        });
    });

    searchInput.addEventListener('input', (e) => {
        filters.search = e.target.value.toLowerCase();
        filterProjects();
    });

    locationFilter.addEventListener('change', (e) => {
        filters.location = e.target.value;
        filterProjects();
    });

    function filterProjects() {
        projectCards.forEach(card => {
            const matchesCategory = filters.category === 'all' || card.dataset.category === filters.category;
            const matchesLocation = filters.location === 'all' || card.dataset.location === filters.location;
            const matchesSearch = card.textContent.toLowerCase().includes(filters.search);

            if (matchesCategory && matchesLocation && matchesSearch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Load More functionality
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    loadMoreBtn.addEventListener('click', async () => {
        currentPage++;
        await loadMoreProjects();
    });

    async function loadMoreProjects() {
        try {
            loadMoreBtn.disabled = true;
            loadMoreBtn.textContent = 'Loading...';

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Add new projects (in real app, this would come from an API)
            const newProjects = generateProjects(6);
            const projectsGrid = document.querySelector('.projects-grid');
            projectsGrid.insertAdjacentHTML('beforeend', newProjects);

            // Re-initialize filtering for new projects
            updateProjectCards();
            
            loadMoreBtn.disabled = false;
            loadMoreBtn.textContent = 'Load More Projects';
        } catch (error) {
            console.error('Error loading more projects:', error);
            loadMoreBtn.textContent = 'Error Loading Projects';
        }
    }

    // Project Details Modal
    const projectModal = document.getElementById('project-modal');
    const closeModal = projectModal.querySelector('.close-modal');

    document.addEventListener('click', async (e) => {
        if (e.target.classList.contains('view-details')) {
            const projectId = e.target.dataset.project;
            await openProjectModal(projectId);
        }
    });

    closeModal.addEventListener('click', () => {
        projectModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            projectModal.style.display = 'none';
        }
    });

    async function openProjectModal(projectId) {
        try {
            const response = await fetch(`../data/projects/${projectId}.json`);
            const data = await response.json();
            
            const modalBody = projectModal.querySelector('.modal-body');
            modalBody.innerHTML = `
                <div class="project-details">
                    <div class="project-gallery">
                        <img src="${data.mainImage}" alt="${data.title}">
                    </div>
                    <div class="project-content">
                        <h2>${data.title}</h2>
                        <p class="project-location">${data.location}</p>
                        <div class="project-description">
                            ${data.description}
                        </div>
                        <div class="project-specs">
                            <h3>Project Specifications</h3>
                            <ul>
                                ${data.specifications.map(spec => `<li>${spec}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            `;
            
            projectModal.style.display = 'block';
        } catch (error) {
            console.error('Error loading project details:', error);
        }
    }
}); 