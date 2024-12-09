import ProductService from './services/productService.js';
import ProductCard from './components/ProductCard.js';

class ProductsPage {
    constructor() {
        this.currentCategory = 'all';
        this.currentPage = 1;
        this.isLoading = false;
        this.hasMore = true;
        
        this.init();
    }

    async init() {
        this.initializeEventListeners();
        await this.loadProducts();
        this.initializeInfiniteScroll();
    }

    initializeEventListeners() {
        // Category tabs
        document.querySelectorAll('.tab-btn').forEach(button => {
            button.addEventListener('click', () => {
                this.currentCategory = button.dataset.category;
                this.currentPage = 1;
                this.hasMore = true;
                this.clearProducts();
                this.loadProducts();
            });
        });

        // Product modals
        document.addEventListener('click', async (e) => {
            if (e.target.classList.contains('product-details')) {
                const productId = e.target.dataset.product;
                await this.openProductModal(productId);
            }
        });
    }

    initializeInfiniteScroll() {
        window.addEventListener('scroll', () => {
            if (this.shouldLoadMore()) {
                this.loadMore();
            }
        });
    }

    shouldLoadMore() {
        if (this.isLoading || !this.hasMore) return false;

        const scrollPosition = window.innerHeight + window.scrollY;
        const threshold = document.body.offsetHeight - 1000;

        return scrollPosition >= threshold;
    }

    async loadProducts() {
        try {
            this.isLoading = true;
            this.showLoader();

            const { products, hasMore } = await ProductService.getProducts(
                this.currentCategory,
                this.currentPage
            );

            this.hasMore = hasMore;
            this.renderProducts(products);
            this.currentPage++;

        } catch (error) {
            this.showError('Error loading products');
        } finally {
            this.hideLoader();
            this.isLoading = false;
        }
    }

    async loadMore() {
        await this.loadProducts();
    }

    renderProducts(products) {
        const container = document.querySelector('.products-grid');
        
        products.forEach(product => {
            const card = new ProductCard(product);
            container.insertAdjacentHTML('beforeend', card.render());
        });
    }

    clearProducts() {
        const container = document.querySelector('.products-grid');
        container.innerHTML = '';
    }

    showLoader() {
        const loader = document.createElement('div');
        loader.className = 'loading-spinner';
        document.querySelector('.products-grid').appendChild(loader);
    }

    hideLoader() {
        const loader = document.querySelector('.loading-spinner');
        if (loader) loader.remove();
    }

    showError(message) {
        showNotification(message, 'error');
    }

    async openProductModal(productId) {
        try {
            const product = await ProductService.getProductDetails(productId);
            // ... rest of the modal opening code ...
        } catch (error) {
            this.showError('Error loading product details');
        }
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    new ProductsPage();
}); 