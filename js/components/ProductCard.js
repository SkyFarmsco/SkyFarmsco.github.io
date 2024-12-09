class ProductCard {
    constructor(product) {
        this.product = product;
    }

    render() {
        return `
            <div class="product-card animate-on-scroll" data-category="${this.product.category}">
                <div class="product-image">
                    <img src="${this.product.mainImage}" alt="${this.product.name}">
                    ${this.product.badge ? `
                        <div class="product-badge">${this.product.badge}</div>
                    ` : ''}
                </div>
                <div class="product-content">
                    <h3>${this.product.name}</h3>
                    <p>${this.product.shortDescription}</p>
                    <ul class="product-features">
                        ${this.product.keyFeatures.map(feature => `
                            <li>${feature}</li>
                        `).join('')}
                    </ul>
                    <button class="btn product-details" data-product="${this.product.id}">
                        Learn More
                    </button>
                </div>
            </div>
        `;
    }
}

export default ProductCard; 