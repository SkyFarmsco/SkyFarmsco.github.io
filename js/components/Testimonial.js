class Testimonial {
    constructor(testimonial) {
        this.testimonial = testimonial;
    }

    render() {
        return `
            <div class="testimonial-card animate-on-scroll">
                <div class="testimonial-content">
                    <div class="quote-icon">
                        <svg viewBox="0 0 24 24" width="32" height="32">
                            <path fill="currentColor" d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L9.74 4.89c0 0-.218.052-.597.144-.377.088-.874.229-1.356.424-.482.189-1.075.358-1.456.734-.402.353-.78.686-1.031 1.122-.293.405-.485.849-.647 1.297-.197.405-.261.842-.326 1.277-.067.404-.073.818-.073 1.174v.215c0 .306 0 .577.036.825.041.247.096.49.154.734.154.684.342 1.357.342 1.357l1.793-.767c0 0-.175-.633-.284-1.314-.067-.409-.132-.834-.132-1.247v-.122c0-.304.035-.611.119-.902.086-.306.158-.567.361-.857.203-.265.441-.505.694-.694.77-.435 1.795-.523 1.795-.523zm11.5 0c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L21.74 4.89c0 0-.218.052-.597.144-.377.088-.874.229-1.356.424-.482.189-1.075.358-1.456.734-.402.353-.78.686-1.031 1.122-.293.405-.485.849-.647 1.297-.197.405-.261.842-.326 1.277-.067.404-.073.818-.073 1.174v.215c0 .306 0 .577.036.825.041.247.096.49.154.734.154.684.342 1.357.342 1.357l1.793-.767c0 0-.175-.633-.284-1.314-.067-.409-.132-.834-.132-1.247v-.122c0-.304.035-.611.119-.902.086-.306.158-.567.361-.857.203-.265.441-.505.694-.694.77-.435 1.795-.523 1.795-.523z"/>
                        </svg>
                    </div>
                    <p class="testimonial-text">${this.testimonial.text}</p>
                    <div class="testimonial-author">
                        <img src="${this.testimonial.authorImage}" alt="${this.testimonial.authorName}" class="author-image">
                        <div class="author-info">
                            <h4>${this.testimonial.authorName}</h4>
                            <p>${this.testimonial.authorTitle}</p>
                            <p class="company">${this.testimonial.company}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

export default Testimonial; 