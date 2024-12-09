class ProductService {
    static async getProducts(category = 'all', page = 1, limit = 9) {
        try {
            // In a real app, this would be an API call
            const response = await fetch(`../data/products/catalog.json`);
            let products = await response.json();
            
            if (category !== 'all') {
                products = products.filter(product => product.category === category);
            }
            
            const start = (page - 1) * limit;
            const end = start + limit;
            
            return {
                products: products.slice(start, end),
                total: products.length,
                hasMore: products.length > end
            };
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    }

    static async getProductDetails(productId) {
        try {
            const response = await fetch(`../data/products/${productId}.json`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching product details:', error);
            throw error;
        }
    }

    static async getProductCategories() {
        try {
            const response = await fetch('../data/products/categories.json');
            return await response.json();
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    }
}

export default ProductService; 