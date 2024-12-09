class TestimonialService {
    static async getTestimonials(limit = null) {
        try {
            const response = await fetch('/data/testimonials.json');
            let testimonials = await response.json();
            
            if (limit) {
                testimonials = testimonials.slice(0, limit);
            }
            
            return testimonials;
        } catch (error) {
            console.error('Error fetching testimonials:', error);
            throw error;
        }
    }

    static async getFeaturedTestimonials() {
        try {
            const testimonials = await this.getTestimonials();
            return testimonials.filter(testimonial => testimonial.featured);
        } catch (error) {
            console.error('Error fetching featured testimonials:', error);
            throw error;
        }
    }
}

export default TestimonialService; 