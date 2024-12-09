class JobCard {
    constructor(job) {
        this.job = job;
    }

    render() {
        return `
            <div class="job-card animate-on-scroll" data-department="${this.job.department}">
                <div class="job-header">
                    <h3>${this.job.title}</h3>
                    <span class="job-type">${this.job.type}</span>
                </div>
                <div class="job-details">
                    <span class="location">
                        <svg viewBox="0 0 24 24" width="16" height="16">
                            <path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        ${this.job.location}
                    </span>
                    <span class="department">
                        <svg viewBox="0 0 24 24" width="16" height="16">
                            <path fill="currentColor" d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM13 16h-2v2h2v-2zm0-6h-2v4h2v-4z"/>
                        </svg>
                        ${this.job.department}
                    </span>
                    <span class="experience">
                        <svg viewBox="0 0 24 24" width="16" height="16">
                            <path fill="currentColor" d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
                        </svg>
                        ${this.job.experience}
                    </span>
                </div>
                <p class="job-description">${this.job.description}</p>
                <div class="job-footer">
                    <button class="btn apply-btn" data-job-id="${this.job.id}">Apply Now</button>
                    <button class="btn outline-btn view-details" data-job-id="${this.job.id}">View Details</button>
                </div>
            </div>
        `;
    }
}

export default JobCard; 