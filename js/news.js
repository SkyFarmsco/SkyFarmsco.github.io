document.addEventListener('DOMContentLoaded', () => {
    // News filtering and search functionality
    const searchInput = document.getElementById('news-search');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const newsCards = document.querySelectorAll('.news-card');
    let currentCategory = 'all';

    // Search functionality
    searchInput.addEventListener('input', filterNews);

    // Category filtering
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentCategory = button.dataset.category;
            filterNews();
        });
    });

    function filterNews() {
        const searchTerm = searchInput.value.toLowerCase();

        newsCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const content = card.querySelector('p').textContent.toLowerCase();
            const category = card.dataset.category;
            
            const matchesSearch = title.includes(searchTerm) || content.includes(searchTerm);
            const matchesCategory = currentCategory === 'all' || category === currentCategory;

            if (matchesSearch && matchesCategory) {
                card.style.display = 'block';
                setTimeout(() => card.classList.add('animate-fade-in'), 10);
            } else {
                card.style.display = 'none';
                card.classList.remove('animate-fade-in');
            }
        });
    }

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

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Add infinite scroll functionality
    let page = 1;
    const newsContainer = document.querySelector('.news-container');
    
    window.addEventListener('scroll', () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1000) {
            loadMoreNews();
        }
    });

    async function loadMoreNews() {
        try {
            // Simulate loading more news
            const loadingIndicator = document.createElement('div');
            loadingIndicator.className = 'loading-spinner';
            newsContainer.appendChild(loadingIndicator);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            page++;

            // Add new news items (this would normally come from an API)
            const newItems = generateNewsItems(3); // Generate 3 new items
            loadingIndicator.remove();
            newsContainer.insertAdjacentHTML('beforeend', newItems);

            // Reinitialize filtering for new items
            updateNewsCards();
        } catch (error) {
            showNotification('Error loading more news', 'error');
        }
    }

    function generateNewsItems(count) {
        // Template for demo news items
        const categories = ['technology', 'sustainability', 'innovation'];
        let html = '';
        
        for (let i = 0; i < count; i++) {
            const category = categories[Math.floor(Math.random() * categories.length)];
            html += `
                <div class="news-card" data-category="${category}">
                    <img src="/images/news-${page}-${i + 1}.jpg" alt="News Image">
                    <div class="news-content">
                        <span class="category-tag">${category}</span>
                        <h3>Latest Development in ${category}</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                           Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <div class="news-footer">
                            <span class="date">March ${i + 1}, 2024</span>
                            <button class="read-more-btn">Read More</button>
                        </div>
                    </div>
                </div>
            `;
        }
        return html;
    }

    function updateNewsCards() {
        newsCards = document.querySelectorAll('.news-card');
        filterNews();
    }

    // Add social sharing functionality
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('read-more-btn')) {
            const newsCard = e.target.closest('.news-card');
            const title = newsCard.querySelector('h3').textContent;
            const shareDialog = createShareDialog(title);
            document.body.appendChild(shareDialog);
        }
    });

    function createShareDialog(title) {
        const dialog = document.createElement('div');
        dialog.className = 'share-dialog';
        dialog.innerHTML = `
            <div class="share-content">
                <h4>Share this article</h4>
                <div class="share-buttons">
                    <button onclick="window.open('https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}')">
                        Twitter
                    </button>
                    <button onclick="window.open('https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}')">
                        LinkedIn
                    </button>
                    <button onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}')">
                        Facebook
                    </button>
                </div>
                <button class="close-dialog">Close</button>
            </div>
        `;

        dialog.querySelector('.close-dialog').addEventListener('click', () => {
            dialog.remove();
        });

        return dialog;
    }
}); 