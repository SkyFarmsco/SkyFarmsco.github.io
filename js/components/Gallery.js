class Gallery {
    constructor(images, options = {}) {
        this.images = images;
        this.options = {
            columns: options.columns || 3,
            gap: options.gap || '1rem',
            aspectRatio: options.aspectRatio || '1/1',
            lightbox: options.lightbox !== false,
            ...options
        };
        this.currentIndex = 0;
    }

    render() {
        return `
            <div class="gallery-container">
                <div class="gallery-grid" style="--columns: ${this.options.columns}; --gap: ${this.options.gap}">
                    ${this.images.map((image, index) => this.renderGalleryItem(image, index)).join('')}
                </div>
                ${this.options.lightbox ? this.renderLightbox() : ''}
            </div>
        `;
    }

    renderGalleryItem(image, index) {
        return `
            <div class="gallery-item animate-on-scroll" style="--aspect-ratio: ${this.options.aspectRatio}">
                <img src="${image.thumbnail || image.url}" 
                     alt="${image.alt || ''}"
                     loading="lazy"
                     ${this.options.lightbox ? `data-gallery-index="${index}" onclick="openLightbox(${index})"` : ''}>
                ${image.caption ? `
                    <div class="gallery-caption">
                        <p>${image.caption}</p>
                    </div>
                ` : ''}
            </div>
        `;
    }

    renderLightbox() {
        return `
            <div class="lightbox" id="gallery-lightbox">
                <button class="lightbox-close">&times;</button>
                <button class="lightbox-prev">
                    <svg viewBox="0 0 24 24" width="24" height="24">
                        <path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                    </svg>
                </button>
                <button class="lightbox-next">
                    <svg viewBox="0 0 24 24" width="24" height="24">
                        <path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                    </svg>
                </button>
                <div class="lightbox-content">
                    <img src="" alt="">
                    <div class="lightbox-caption"></div>
                </div>
            </div>
        `;
    }

    initialize() {
        if (!this.options.lightbox) return;

        const lightbox = document.getElementById('gallery-lightbox');
        const lightboxImg = lightbox.querySelector('img');
        const lightboxCaption = lightbox.querySelector('.lightbox-caption');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');

        window.openLightbox = (index) => {
            this.currentIndex = index;
            this.updateLightboxContent(lightboxImg, lightboxCaption);
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        closeBtn.addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        });

        prevBtn.addEventListener('click', () => {
            this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
            this.updateLightboxContent(lightboxImg, lightboxCaption);
        });

        nextBtn.addEventListener('click', () => {
            this.currentIndex = (this.currentIndex + 1) % this.images.length;
            this.updateLightboxContent(lightboxImg, lightboxCaption);
        });

        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            
            switch(e.key) {
                case 'Escape':
                    lightbox.classList.remove('active');
                    document.body.style.overflow = '';
                    break;
                case 'ArrowLeft':
                    prevBtn.click();
                    break;
                case 'ArrowRight':
                    nextBtn.click();
                    break;
            }
        });
    }

    updateLightboxContent(img, caption) {
        const currentImage = this.images[this.currentIndex];
        img.src = currentImage.url;
        img.alt = currentImage.alt || '';
        caption.textContent = currentImage.caption || '';
    }
}

export default Gallery; 