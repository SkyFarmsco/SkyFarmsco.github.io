class Slider {
    constructor(element) {
        this.element = element;
        this.slides = Array.from(element.querySelectorAll('.slide'));
        this.current = 0;
        this.autoPlay = element.dataset.autoplay === 'true';
        this.interval = null;
        
        this.init();
    }

    init() {
        if (this.slides.length < 2) return;
        
        // Create navigation buttons
        this.createNavigation();
        
        // Set initial state
        this.updateSlides();
        
        // Start autoplay if enabled
        if (this.autoPlay) {
            this.startAutoplay();
        }
    }

    createNavigation() {
        const nav = document.createElement('div');
        nav.className = 'slider-nav';
        
        const prevBtn = document.createElement('button');
        prevBtn.className = 'prev';
        prevBtn.innerHTML = '←';
        prevBtn.addEventListener('click', () => this.prev());
        
        const nextBtn = document.createElement('button');
        nextBtn.className = 'next';
        nextBtn.innerHTML = '→';
        nextBtn.addEventListener('click', () => this.next());
        
        nav.appendChild(prevBtn);
        nav.appendChild(nextBtn);
        this.element.appendChild(nav);
    }

    next() {
        this.current = (this.current + 1) % this.slides.length;
        this.updateSlides();
    }

    prev() {
        this.current = (this.current - 1 + this.slides.length) % this.slides.length;
        this.updateSlides();
    }

    updateSlides() {
        this.slides.forEach((slide, index) => {
            if (index === this.current) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
    }

    startAutoplay() {
        this.interval = setInterval(() => this.next(), 5000);
        
        // Pause on hover
        this.element.addEventListener('mouseenter', () => {
            clearInterval(this.interval);
        });
        
        this.element.addEventListener('mouseleave', () => {
            this.interval = setInterval(() => this.next(), 5000);
        });
    }
}

// Initialize sliders
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.slider').forEach(slider => new Slider(slider));
}); 