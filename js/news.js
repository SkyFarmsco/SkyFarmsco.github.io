import NewsService from './services/newsService.js';

class NewsManager {
    constructor() {
        this.currentPage = 1;
        this.isLoading = false;
        this.hasMore = true;
        this.currentFilters = {
            category: 'all',
            search: '',
            date: 'all'
        };
        this.highlightIndex = 0;
        this.highlightInterval = null;
        this.init();
    }

    async init() {
        await Promise.all([
            this.initializeHighlights(),
            this.initializeNewsSections()
        ]);
        
        this.initializeFilters();
        this.initializeLoadMore();
        this.initializeNewsletterForm();
        this.initializeResourceDownloads();
    }

    async initializeHighlights() {
        const carousel = document.querySelector('.highlight-carousel');
        if (!carousel) return;

        try {
            const highlights = await NewsService.getHighlights();
            carousel.innerHTML = highlights.map((highlight, index) => `
                <div class="highlight-slide ${index === 0 ? 'active' : ''}">
                    <div class="highlight-content">
                        <span class="highlight-tag">${highlight.category}</span>
                        <h2>${highlight.title}</h2>
                        <p>${highlight.excerpt}</p>
                        <a href="#" class="read-more" data-article="${highlight.id}">Read Full Story</a>
                    </div>
                    <div class="highlight-image">
                        <img src="${highlight.image}" alt="${highlight.title}">
                    </div>
                </div>
            `).join('');

            this.initializeCarouselControls();
        } catch (error) {
            console.error('Error loading highlights:', error);
            carousel.innerHTML = '<p class="error-message">Failed to load highlights</p>';
        }
    }

    async initializeNewsSections() {
        const sections = ['press-releases', 'research', 'media'];
        
        await Promise.all(sections.map(section => this.loadNewsSection(section)));
    }

    async loadNewsSection(section) {
        const grid = document.querySelector(`#${section} .news-grid`);
        if (!grid) return;

        try {
            grid.innerHTML = '<div class="loading-spinner"></div>';
            const { items } = await NewsService.getNews(section);
            
            grid.innerHTML = items.map(item => this.createNewsCard(item)).join('');
            
            // Initialize animations
            grid.querySelectorAll('.news-card').forEach((card, index) => {
                this.animateCard(card, index);
            });
        } catch (error) {
            grid.innerHTML = '<p class="error-message">Failed to load news items</p>';
        }
    }

    createNewsCard(item) {
        return `
            <div class="news-card animate-on-scroll" data-category="${item.category.toLowerCase()}">
                <div class="news-image">
                    <img src="${item.image}" alt="${item.title}">
                    <span class="category-tag">${item.category}</span>
                </div>
                <div class="news-content">
                    <h3>${item.title}</h3>
                    <p class="article-meta">
                        <span class="date">${new Date(item.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</span>
                        <span class="author">${item.author || item.source || 'SkyFarms Team'}</span>
                    </p>
                    <p class="excerpt">${item.excerpt}</p>
                    <button class="read-more-btn" data-article="${item.id}">Read Full Story</button>
                </div>
            </div>
        `;
    }

    initializeFilters() {
        const searchInput = document.querySelector('#news-search');
        const clearSearchBtn = document.querySelector('.clear-search');
        let debounceTimer;

        searchInput?.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            if (e.target.value) {
                clearSearchBtn.style.display = 'block';
            } else {
                clearSearchBtn.style.display = 'none';
            }

            debounceTimer = setTimeout(() => {
                this.currentFilters.search = e.target.value.toLowerCase();
                this.filterNews();
            }, 300);
        });

        // Category filters for Press Releases, Research Updates, and Media Coverage
        document.querySelectorAll('.category-btn').forEach(button => {
            button.addEventListener('click', () => {
                document.querySelectorAll('.category-btn').forEach(btn => 
                    btn.classList.remove('active'));
                button.classList.add('active');
                this.currentFilters.category = button.dataset.category;
                this.filterNews();
            });
        });

        // Date filter
        const dateFilter = document.querySelector('#date-filter');
        dateFilter?.addEventListener('change', (e) => {
            this.currentFilters.date = e.target.value;
            this.filterNews();
        });
    }

    filterNews() {
        const sections = ['press-releases', 'research', 'media'];
        let visibleCount = 0;

        sections.forEach(sectionId => {
            const newsGrid = document.querySelector(`#${sectionId} .news-grid`);
            const cards = newsGrid?.querySelectorAll('.news-card');
            
            cards?.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const content = card.querySelector('p').textContent.toLowerCase();
                const date = new Date(card.querySelector('.date').textContent);

                const matchesSearch = title.includes(this.currentFilters.search) || 
                                    content.includes(this.currentFilters.search);
                const matchesCategory = this.currentFilters.category === 'all' || 
                                      sectionId.includes(this.currentFilters.category);
                const matchesDate = this.dateFilterMatches(date);

                if (matchesSearch && matchesCategory && matchesDate) {
                    card.style.display = 'block';
                    this.animateCard(card, visibleCount);
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });
        });

        this.updateNoResults(visibleCount === 0);
    }

    initializeLoadMore() {
        const loadMoreBtn = document.querySelector('.load-more');
        if (!loadMoreBtn) return;

        loadMoreBtn.addEventListener('click', async () => {
            if (this.isLoading || !this.hasMore) return;

            this.isLoading = true;
            loadMoreBtn.classList.add('loading');

            try {
                // Simulate loading more articles
                await new Promise(resolve => setTimeout(resolve, 1000));
                // Load more logic here...
                
                this.currentPage++;
                // Check if there are more articles to load
                if (this.currentPage >= 5) { // Example limit
                    this.hasMore = false;
                    loadMoreBtn.style.display = 'none';
                }
            } catch (error) {
                console.error('Error loading more articles:', error);
            } finally {
                this.isLoading = false;
                loadMoreBtn.classList.remove('loading');
            }
        });
    }

    initializeNewsletterForm() {
        const form = document.querySelector('.newsletter-form');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');

            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                this.showNotification('Successfully subscribed to newsletter!', 'success');
                form.reset();
            } catch (error) {
                this.showNotification('Failed to subscribe. Please try again.', 'error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
            }
        });
    }

    initializeResourceDownloads() {
        document.querySelectorAll('.resource-card').forEach(card => {
            const downloadBtn = card.querySelector('.download-link');
            if (downloadBtn) {
                downloadBtn.addEventListener('click', async (e) => {
                    e.preventDefault();
                    try {
                        this.showNotification('Starting download...', 'info');
                        // Simulate download
                        await new Promise(resolve => setTimeout(resolve, 1500));
                        this.showNotification('Download complete!', 'success');
                    } catch (error) {
                        this.showNotification('Download failed', 'error');
                    }
                });
            }
        });
    }

    showNotification(message, type = 'info') {
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

    dateFilterMatches(date) {
        if (this.currentFilters.date === 'all') return true;
        const now = new Date();
        const diff = now - date;
        const daysAgo = diff / (1000 * 60 * 60 * 24);

        switch (this.currentFilters.date) {
            case 'week': return daysAgo <= 7;
            case 'month': return daysAgo <= 30;
            case 'year': return daysAgo <= 365;
            default: return true;
        }
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

    goToSlide(index) {
        const slides = document.querySelectorAll('.highlight-slide');
        const indicators = document.querySelectorAll('.indicator');
        
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        this.highlightIndex = index;
    }

    prevSlide() {
        const slides = document.querySelectorAll('.highlight-slide');
        this.highlightIndex = (this.highlightIndex - 1 + slides.length) % slides.length;
        this.goToSlide(this.highlightIndex);
    }

    nextSlide() {
        const slides = document.querySelectorAll('.highlight-slide');
        this.highlightIndex = (this.highlightIndex + 1) % slides.length;
        this.goToSlide(this.highlightIndex);
    }

    openArticleModal(article) {
        const modal = document.createElement('div');
        modal.className = 'modal article-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <div class="article-content">
                    <div class="article-header">
                        <span class="category-tag">${article.dataset.category}</span>
                        <h2>${article.querySelector('h3').textContent}</h2>
                        <div class="article-meta">
                            <span class="date">${article.querySelector('.date').textContent}</span>
                            <span class="author">${article.querySelector('.author')?.textContent || 'SkyFarms Team'}</span>
                        </div>
                    </div>
                    <div class="article-body">
                        <!-- Content would be loaded dynamically -->
                        <p>Loading article content...</p>
                    </div>
                    <div class="article-footer">
                        <div class="share-buttons">
                            <button onclick="this.shareArticle('twitter')">Share on Twitter</button>
                            <button onclick="this.shareArticle('linkedin')">Share on LinkedIn</button>
                            <button onclick="this.shareArticle('facebook')">Share on Facebook</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });

        // Simulate loading article content
        setTimeout(() => {
            modal.querySelector('.article-body').innerHTML = `
                <p>Full article content would be loaded here...</p>
                <!-- More content -->
            `;
        }, 1000);
    }

    initializeCarouselControls() {
        const slides = document.querySelectorAll('.highlight-slide');
        const indicators = document.querySelectorAll('.indicator');
        
        indicators.forEach(indicator => {
            indicator.addEventListener('click', () => {
                const index = Array.from(indicators).indexOf(indicator);
                this.goToSlide(index);
            });
        });
    }

    shareArticle(platform) {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);
        
        const shareUrls = {
            twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`
        };

        window.open(shareUrls[platform], '_blank');
    }
}

// Initialize the news manager
document.addEventListener('DOMContentLoaded', () => {
    new NewsManager();
}); 