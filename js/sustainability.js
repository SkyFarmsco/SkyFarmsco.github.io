document.addEventListener('DOMContentLoaded', () => {
    // Initialize charts
    initializeCharts();
    
    // Initialize progress rings
    initializeProgressRings();
    
    // Animate timeline on scroll
    initializeTimelineAnimation();
});

function initializeCharts() {
    // Water Savings Chart
    new Chart(document.getElementById('waterSavingsChart'), {
        type: 'doughnut',
        data: {
            labels: ['Water Saved', 'Water Used'],
            datasets: [{
                data: [90, 10],
                backgroundColor: ['#4caf50', '#e0e0e0']
            }]
        },
        options: {
            responsive: true,
            cutout: '70%',
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    // Energy Usage Chart
    new Chart(document.getElementById('energyUsageChart'), {
        type: 'bar',
        data: {
            labels: ['2020', '2021', '2022', '2023'],
            datasets: [{
                label: 'Renewable Energy Usage (%)',
                data: [30, 50, 75, 95],
                backgroundColor: '#4caf50'
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
    new Chart(document.getElementById('carbonFootprintChart'), {
        type: 'line',
        data: {
            labels: ['2020', '2021', '2022', '2023'],
            datasets: [{
                label: 'Carbon Emissions (tons)',
                data: [100, 80, 50, 20],
                borderColor: '#4caf50',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function initializeProgressRings() {
    document.querySelectorAll('.goal-progress').forEach(container => {
        const circle = container.querySelector('.progress-ring__circle');
        const radius = circle.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;
        const progress = container.dataset.progress;

        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = circumference;

        function setProgress(percent) {
            const offset = circumference - (percent / 100 * circumference);
            circle.style.strokeDashoffset = offset;
        }

        // Animate progress when in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setProgress(progress);
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(container);
    });
}

function initializeTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-timeline');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    timelineItems.forEach(item => observer.observe(item));
} 