class Stats {
    constructor(stats) {
        this.stats = stats;
    }

    render() {
        return `
            <div class="stats-grid">
                ${this.stats.map(stat => this.renderStatItem(stat)).join('')}
            </div>
        `;
    }

    renderStatItem(stat) {
        return `
            <div class="stat-card animate-on-scroll">
                <div class="stat-icon">
                    ${stat.icon ? `<img src="${stat.icon}" alt="${stat.label}">` : ''}
                </div>
                <div class="stat-content">
                    <div class="stat-value">
                        <span class="counter" data-value="${stat.value}">${stat.prefix || ''}0${stat.suffix || ''}</span>
                    </div>
                    <p class="stat-label">${stat.label}</p>
                    ${stat.description ? `<p class="stat-description">${stat.description}</p>` : ''}
                </div>
            </div>
        `;
    }

    initialize() {
        const counters = document.querySelectorAll('.counter');
        const options = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.dataset.value);
                    const prefix = counter.textContent.match(/^[^\d]*/)[0];
                    const suffix = counter.textContent.match(/[^\d]*$/)[0];
                    let current = 0;
                    const increment = target / 50; // Divide animation into 50 steps
                    const duration = 1500; // Animation duration in milliseconds
                    const stepTime = duration / 50;

                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.textContent = prefix + Math.round(current) + suffix;
                            setTimeout(updateCounter, stepTime);
                        } else {
                            counter.textContent = prefix + target + suffix;
                        }
                    };

                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        counters.forEach(counter => observer.observe(counter));
    }
}

export default Stats; 