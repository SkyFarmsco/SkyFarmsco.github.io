class Feature {
    constructor(feature) {
        this.feature = feature;
    }

    render() {
        return `
            <div class="feature-card animate-on-scroll">
                <div class="feature-icon">
                    <img src="${this.feature.icon}" alt="${this.feature.title}">
                </div>
                <div class="feature-content">
                    <h3>${this.feature.title}</h3>
                    <p>${this.feature.description}</p>
                    ${this.feature.stats ? this.renderStats() : ''}
                    ${this.feature.link ? `
                        <a href="${this.feature.link}" class="feature-link">
                            Learn More
                            <svg viewBox="0 0 24 24" width="16" height="16">
                                <path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                            </svg>
                        </a>
                    ` : ''}
                </div>
            </div>
        `;
    }

    renderStats() {
        return `
            <div class="feature-stats">
                ${this.feature.stats.map(stat => `
                    <div class="stat">
                        <span class="stat-value">${stat.value}</span>
                        <span class="stat-label">${stat.label}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }
}

export default Feature; 