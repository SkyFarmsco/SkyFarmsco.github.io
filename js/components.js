class ComponentLoader {
    static async loadComponents() {
        const basePath = location.pathname.includes('/pages/') ? '..' : '.';
        await this.loadHeader(basePath);
        await this.loadFooter(basePath);
        this.initializeNavigation();
    }

    static async loadHeader(basePath) {
        const response = await fetch(`${basePath}/components/header.html`);
        const headerHtml = await response.text();
        // Replace paths in headerHtml
        const updatedHtml = headerHtml.replace(/src="\/images/g, `src="${basePath}/images`)
                                    .replace(/href="\/pages/g, `href="${basePath}/pages`);
        document.body.insertAdjacentHTML('afterbegin', updatedHtml);
    }

    static async loadFooter(basePath) {
        const response = await fetch(`${basePath}/components/footer.html`);
        const footerHtml = await response.text();
        // Replace paths in footerHtml
        const updatedHtml = footerHtml.replace(/src="\/images/g, `src="${basePath}/images`)
                                    .replace(/href="\/pages/g, `href="${basePath}/pages`);
        document.body.insertAdjacentHTML('beforeend', updatedHtml);
    }

    static initializeNavigation() {
        // Highlight current page in navigation
        const currentPath = window.location.pathname;
        document.querySelectorAll('[data-nav-link]').forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            }
        });

        // Mobile menu functionality
        const burgerMenu = document.getElementById('burger-menu');
        const navLinks = document.querySelector('.nav-links');

        burgerMenu.addEventListener('click', () => {
            burgerMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!burgerMenu.contains(e.target) && !navLinks.contains(e.target)) {
                burgerMenu.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });

        // Newsletter form handling
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = newsletterForm.querySelector('input[type="email"]').value;
                
                // Simulate API call
                setTimeout(() => {
                    showNotification('Thanks for subscribing!', 'success');
                    newsletterForm.reset();
                }, 1000);
            });
        }
    }
}

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    ComponentLoader.loadComponents();
}); 