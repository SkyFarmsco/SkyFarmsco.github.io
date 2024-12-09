class NewsHighlight {
    constructor(highlight) {
        this.highlight = highlight;
    }

    render() {
        return `
            <div class="highlight-slide" data-id="${this.highlight.id}">
                <div class="highlight-content">
                    <span class="highlight-tag">${this.highlight.category}</span>
                    <h2>${this.highlight.title}</h2>
                    <p>${this.highlight.excerpt}</p>
                    <a href="/pages/news.html?article=${this.highlight.id}" class="read-more">
                        Read Full Story
                        <svg viewBox="0 0 24 24" width="16" height="16">
                            <path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                        </svg>
                    </a>
                </div>
                <div class="highlight-image">
                    <img src="${this.highlight.image}" alt="${this.highlight.title}">
                </div>
            </div>
        `;
    }
}

export default NewsHighlight; 