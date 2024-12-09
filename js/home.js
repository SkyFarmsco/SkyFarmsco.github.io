import TestimonialService from './services/testimonialService.js';
import NewsService from './services/newsService.js';
import PartnerService from './services/partnerService.js';
import Testimonial from './components/Testimonial.js';
import NewsCard from './components/NewsCard.js';

class HomePage {
    constructor() {
        this.init();
    }

    async init() {
        this.initVideoBackground();
        this.initScrollIndicator();
        this.initSolutionsSlider();
        await this.loadTestimonials();
        await this.loadLatestNews();
        await this.loadPartners();
        this.initNewsletterForm();
    }

    initVideoBackground() {
        const video = document.querySelector('.hero-video');
        if (video) {
            video.play().catch(() => {
                video.style.display = 'none';
                video.parentElement.style.backgroundImage = 'url("/images/hero/hero-fallback.jpg")';
            });
        }
    }

    initScrollIndicator() {
        const indicator = document.querySelector('.scroll-indicator');
        if (indicator) {
            window.addEventListener('scroll', () => {
                indicator.style.opacity = window.scrollY > 100 ? '0' : '1';
            });
        }
    }

    initSolutionsSlider() {
        const slider = document.querySelector('.solutions-slider');
        if (!slider) return;

        const cards = slider.querySelector('.solution-cards');
        const prevBtn = slider.querySelector('.slider-prev');
        const nextBtn = slider.querySelector('.slider-next');
        const cardWidth = 350 + 32; // card width + gap
        let currentPosition = 0;

        const updateSlider = () => {
            cards.style.transform = `translateX(${-currentPosition * cardWidth}px)`;
        };

        prevBtn?.addEventListener('click', () => {
            currentPosition = Math.max(currentPosition - 1, 0);
            updateSlider();
        });

        nextBtn?.addEventListener('click', () => {
            const maxPosition = Math.floor(cards.children.length - slider.offsetWidth / cardWidth);
            currentPosition = Math.min(currentPosition + 1, maxPosition);
            updateSlider();
        });
    }

    async loadTestimonials() {
        try {
            const testimonials = await TestimonialService.getFeaturedTestimonials();
            const container = document.querySelector('.testimonials-grid');
            if (!container) return;

            testimonials.forEach(testimonial => {
                const testimonialComponent = new Testimonial(testimonial);
                container.insertAdjacentHTML('beforeend', testimonialComponent.render());
            });
        } catch (error) {
            console.error('Error loading testimonials:', error);
        }
    }

    async loadLatestNews() {
        try {
            const news = await NewsService.getLatestNews();
            const container = document.querySelector('.news-grid');
            if (!container) return;

            news.forEach(article => {
                const newsCard = new NewsCard(article);
                container.insertAdjacentHTML('beforeend', newsCard.render());
            });
        } catch (error) {
            console.error('Error loading news:', error);
        }
    }

    async loadPartners() {
        try {
            const partners = await PartnerService.getPartnerLogos();
            const track = document.querySelector('.partners-track');
            if (!track) return;

            const partnerLogos = partners.map(partner => `
                <div class="partner-logo">
                    <img src="${partner.logo}" alt="${partner.name}">
                </div>
            `).join('');

            // Double the logos for infinite scroll effect
            track.innerHTML = partnerLogos + partnerLogos;
        } catch (error) {
            console.error('Error loading partners:', error);
        }
    }

    initNewsletterForm() {
        const form = document.querySelector('.newsletter-form');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value;

            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Show success message
                showNotification('Thank you for subscribing!', 'success');
                form.reset();
            } catch (error) {
                showNotification('Error subscribing to newsletter', 'error');
            }
        });
    }
}

// Initialize homepage
document.addEventListener('DOMContentLoaded', () => {
    new HomePage();
}); 