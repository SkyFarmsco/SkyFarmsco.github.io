document.addEventListener('DOMContentLoaded', () => {
    // Hotspot Interactions
    const hotspots = document.querySelectorAll('.hotspot');
    
    hotspots.forEach(hotspot => {
        hotspot.addEventListener('mouseenter', () => {
            const content = hotspot.querySelector('.hotspot-content');
            content.style.opacity = '1';
            content.style.visibility = 'visible';
        });

        hotspot.addEventListener('mouseleave', () => {
            const content = hotspot.querySelector('.hotspot-content');
            content.style.opacity = '0';
            content.style.visibility = 'hidden';
        });
    });

    // Modal Handling
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = `${trigger.dataset.modal}-modal`;
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
                loadModalContent(trigger.dataset.modal);
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            modal.style.display = 'none';
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    // Load Modal Content
    async function loadModalContent(technology) {
        const modal = document.getElementById(`${technology}-modal`);
        const modalBody = modal.querySelector('.modal-body');

        try {
            const response = await fetch(`../data/technology/${technology}.json`);
            const data = await response.json();
            
            modalBody.innerHTML = `
                <div class="modal-grid">
                    <div class="modal-image">
                        <img src="${data.image}" alt="${data.title}">
                    </div>
                    <div class="modal-info">
                        <p>${data.description}</p>
                        <h3>Key Features:</h3>
                        <ul>
                            ${data.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
        } catch (error) {
            modalBody.innerHTML = '<p>Error loading content. Please try again later.</p>';
        }
    }
}); 