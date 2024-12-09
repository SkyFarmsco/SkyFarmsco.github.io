class NewsCard {
    constructor(article) {
        this.article = article;
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    truncateText(text, length = 150) {
        if (text.length <= length) return text;
        return text.substring(0, length).trim() + '...';
    }

    getReadTime() {
        const wordsPerMinute = 200;
        const wordCount = this.article.content?.split(/\s+/).length || 0;
        const readTime = Math.ceil(wordCount / wordsPerMinute);
        return `${readTime} min read`;
    }

    getCategoryClass() {
        const categoryMap = {
            'Press Release': 'press',
            'Research': 'research',
            'Media Coverage': 'media',
            'Breaking News': 'breaking'
        };
        return categoryMap[this.article.category] || 'default';
    }

    render() {
        return `
            <div class="news-card animate-on-scroll" 
                 data-category="${this.article.category.toLowerCase()}"
                 data-id="${this.article.id}">
                <div class="news-image">
                    <img src="${this.article.thumbnail}" 
                         alt="${this.article.title}"
                         loading="lazy">
                    <div class="category-tags">
                        <span class="category-tag ${this.getCategoryClass()}">
                            ${this.article.category}
                        </span>
                        ${this.article.featured ? `
                            <span class="featured-tag">Featured</span>
                        ` : ''}
                    </div>
                </div>
                <div class="news-content">
                    <div class="news-meta">
                        <span class="date">
                            <i class="icon-calendar"></i>
                            ${this.formatDate(this.article.date)}
                        </span>
                        <span class="read-time">
                            <i class="icon-clock"></i>
                            ${this.getReadTime()}
                        </span>
                    </div>
                    <h3>${this.article.title}</h3>
                    <p class="excerpt">${this.truncateText(this.article.excerpt)}</p>
                    <div class="news-footer">
                        <div class="author">
                            ${this.article.author ? `
                                <img src="${this.article.authorImage || '../images/defaults/avatar.jpg'}" 
                                     alt="${this.article.author}"
                                     class="author-image">
                                <span class="author-name">${this.article.author}</span>
                            ` : ''}
                        </div>
                        <div class="actions">
                            <button class="share-btn" aria-label="Share article">
                                <i class="icon-share"></i>
                            </button>
                            <button class="read-more-btn" data-article="${this.article.id}">
                                Read Full Story
                                <i class="icon-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="share-menu">
                    <button class="share-option" data-platform="twitter">
                        <i class="icon-twitter"></i>
                        Twitter
                    </button>
                    <button class="share-option" data-platform="linkedin">
                        <i class="icon-linkedin"></i>
                        LinkedIn
                    </button>
                    <button class="share-option" data-platform="facebook">
                        <i class="icon-facebook"></i>
                        Facebook
                    </button>
                    <button class="share-option" data-platform="copy">
                        <i class="icon-link"></i>
                        Copy Link
                    </button>
                </div>
            </div>
        `;
    }

    static attachEventListeners(card) {
        const shareBtn = card.querySelector('.share-btn');
        const shareMenu = card.querySelector('.share-menu');
        const shareOptions = card.querySelectorAll('.share-option');
        const readMoreBtn = card.querySelector('.read-more-btn');

        // Share button toggle
        shareBtn?.addEventListener('click', (e) => {
            e.stopPropagation();
            shareMenu.classList.toggle('active');
        });

        // Share options
        shareOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const platform = option.dataset.platform;
                const url = encodeURIComponent(window.location.href);
                const title = encodeURIComponent(document.title);

                switch (platform) {
                    case 'twitter':
                        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`);
                        break;
                    case 'linkedin':
                        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`);
                        break;
                    case 'facebook':
                        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
                        break;
                    case 'copy':
                        navigator.clipboard.writeText(window.location.href)
                            .then(() => {
                                this.showNotification('Link copied to clipboard!', 'success');
                            })
                            .catch(() => {
                                this.showNotification('Failed to copy link', 'error');
                            });
                        break;
                }
                shareMenu.classList.remove('active');
            });
        });

        // Close share menu when clicking outside
        document.addEventListener('click', () => {
            shareMenu.classList.remove('active');
        });

        // Read more button
        readMoreBtn?.addEventListener('click', () => {
            const articleId = readMoreBtn.dataset.article;
            // Handle article navigation or modal opening
        });
    }

    showNotification(message, type) {
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

export default NewsCard; 