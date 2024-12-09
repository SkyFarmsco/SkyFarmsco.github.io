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

    render() {
        return `
            <div class="news-card animate-on-scroll" data-category="${this.article.category}">
                <div class="news-image">
                    <img src="${this.article.thumbnail}" alt="${this.article.title}">
                    <span class="category-tag">${this.article.category}</span>
                </div>
                <div class="news-content">
                    <div class="news-meta">
                        <span class="date">${this.formatDate(this.article.date)}</span>
                        <span class="author">${this.article.author}</span>
                    </div>
                    <h3>${this.article.title}</h3>
                    <p>${this.article.excerpt}</p>
                    <div class="news-footer">
                        <button class="read-more" data-article="${this.article.id}">
                            Read More
                        </button>
                        <div class="tags">
                            ${this.article.tags.map(tag => `
                                <span class="tag">#${tag}</span>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

export default NewsCard; 