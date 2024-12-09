class ProjectCard {
    constructor(project) {
        this.project = project;
    }

    render() {
        return `
            <div class="project-card animate-on-scroll" data-category="${this.project.category}">
                <div class="project-image">
                    <img src="${this.project.thumbnail}" alt="${this.project.title}">
                    <div class="project-overlay">
                        <span class="project-status ${this.project.status}">${this.project.status}</span>
                        <button class="view-details" data-project="${this.project.id}">View Details</button>
                    </div>
                </div>
                <div class="project-content">
                    <h3>${this.project.title}</h3>
                    <div class="project-meta">
                        <span class="location">${this.project.location}</span>
                        <span class="area">${this.project.area}</span>
                    </div>
                    <p>${this.project.description}</p>
                    <div class="project-highlights">
                        ${this.project.highlights.slice(0, 3).map(highlight => `
                            <span class="highlight">${highlight}</span>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }
}

export default ProjectCard; 