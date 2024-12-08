class Counter {
    constructor(element) {
        this.element = element;
        this.target = parseInt(element.dataset.value, 10);
        this.current = 0;
        this.increment = this.target / 50; // Divide animation into 50 steps
        this.observer = new IntersectionObserver(this.handleIntersect.bind(this), {
            threshold: 0.5
        });
        this.observer.observe(element);
    }

    handleIntersect(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.animate();
                this.observer.unobserve(entry.target);
            }
        });
    }

    animate() {
        const update = () => {
            this.current += this.increment;
            if (this.current < this.target) {
                this.element.textContent = Math.round(this.current);
                requestAnimationFrame(update);
            } else {
                this.element.textContent = this.target;
            }
        };
        requestAnimationFrame(update);
    }
}

// Initialize counters
document.querySelectorAll('.counter').forEach(counter => new Counter(counter)); 