class NewsService {
    static async getNews(page = 1, limit = 3) {
        try {
            const response = await fetch('/data/news.json');
            let news = await response.json();
            
            const start = (page - 1) * limit;
            const end = start + limit;
            
            return {
                articles: news.articles.slice(start, end),
                total: news.articles.length,
                hasMore: news.articles.length > end
            };
        } catch (error) {
            console.error('Error fetching news:', error);
            throw error;
        }
    }

    static async getLatestNews(limit = 3) {
        try {
            const news = await this.getNews(1, limit);
            return news.articles;
        } catch (error) {
            console.error('Error fetching latest news:', error);
            throw error;
        }
    }
}

export default NewsService; 