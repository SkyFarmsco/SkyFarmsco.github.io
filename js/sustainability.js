class SustainabilityManager {
    constructor() {
        this.charts = {};
        this.init();
    }

    init() {
        this.initializeCharts();
        this.initializeTimeline();
        this.initializeProgressBars();
        this.initializeCertifications();
        this.initializeDownloads();
    }

    initializeCharts() {
        // Water Savings Chart
        this.createChart('waterSavingsChart', {
            type: 'doughnut',
            data: {
                labels: ['Water Saved', 'Water Used'],
                datasets: [{
                    data: [95, 5],
                    backgroundColor: ['#4CAF50', '#E0E0E0'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                cutout: '75%',
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });

        // Energy Usage Chart
        this.createChart('energyUsageChart', {
            type: 'bar',
            data: {
                labels: ['Traditional', 'SkyFarms'],
                datasets: [{
                    label: 'Energy Efficiency',
                    data: [100, 30],
                    backgroundColor: ['#FF9800', '#4CAF50']
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });

        // Carbon Footprint Chart
        this.createChart('carbonFootprintChart', {
            type: 'line',
            data: {
                labels: ['2020', '2021', '2022', '2023', '2024'],
                datasets: [{
                    label: 'Carbon Reduction',
                    data: [0, 20, 40, 60, 70],
                    borderColor: '#4CAF50',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: value => value + '%'
                        }
                    }
                }
            }
        });
    }

    createChart(canvasId, config) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        this.charts[canvasId] = new Chart(canvas, config);

        // Add interactivity
        const metricCard = canvas.closest('.metric-card');
        if (metricCard) {
            const overlay = metricCard.querySelector('.metric-overlay');
            metricCard.addEventListener('mouseenter', () => {
                overlay?.classList.add('active');
            });
            metricCard.addEventListener('mouseleave', () => {
                overlay?.classList.remove('active');
            });
        }
    }

    initializeTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                    
                    // Animate progress bar if it exists
                    const progressBar = entry.target.querySelector('.progress-bar');
                    if (progressBar) {
                        const progress = progressBar.dataset.progress;
                        progressBar.querySelector('.progress').style.width = `${progress}%`;
                        progressBar.querySelector('.progress-text').textContent = `${progress}% Complete`;
                    }
                }
            });
        }, { threshold: 0.2 });

        timelineItems.forEach(item => observer.observe(item));
    }

    initializeProgressBars() {
        const progressRings = document.querySelectorAll('.progress-ring__circle');
        
        progressRings.forEach(ring => {
            const progress = ring.closest('.goal-card').querySelector('.goal-progress').dataset.progress;
            const radius = ring.r.baseVal.value;
            const circumference = radius * 2 * Math.PI;
            
            ring.style.strokeDasharray = `${circumference} ${circumference}`;
            ring.style.strokeDashoffset = circumference;

            setTimeout(() => {
                const offset = circumference - (progress / 100 * circumference);
                ring.style.strokeDashoffset = offset;
            }, 100);
        });
    }

    initializeCertifications() {
        const badges = document.querySelectorAll('.badge-item');
        
        badges.forEach(badge => {
            badge.addEventListener('click', () => {
                this.openCertificationModal(badge);
            });
        });
    }

    openCertificationModal(badge) {
        const modal = document.createElement('div');
        modal.className = 'modal certification-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <div class="certification-details">
                    <img src="${badge.querySelector('img').src}" alt="${badge.querySelector('span').textContent}">
                    <h3>${badge.querySelector('span').textContent}</h3>
                    <p>Detailed information about this certification would appear here...</p>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        
        modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    }

    initializeDownloads() {
        const downloadBtn = document.querySelector('a[href*="sustainability-report.pdf"]');
        if (!downloadBtn) return;

        downloadBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            
            try {
                this.showNotification('Starting download...', 'info');
                // Simulate download delay
                await new Promise(resolve => setTimeout(resolve, 1500));
                this.showNotification('Report downloaded successfully!', 'success');
                // Actual download would happen here
                window.location.href = downloadBtn.href;
            } catch (error) {
                this.showNotification('Download failed. Please try again.', 'error');
            }
        });
    }

    showNotification(message, type = 'info') {
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

// Initialize the sustainability manager
document.addEventListener('DOMContentLoaded', () => {
    new SustainabilityManager();
}); 