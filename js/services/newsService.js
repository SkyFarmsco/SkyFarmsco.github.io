class NewsService {
    static async getNews(category = 'all', page = 1, limit = 6) {
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 800));

            // This would normally fetch from an API
            const newsItems = {
                'press-releases': [
                    {
                        id: 'pr1',
                        title: 'SkyFarms Launches Largest Vertical Farm in North Africa',
                        excerpt: 'Our newest facility spans 5000m² and will produce over 1000 tons of fresh vegetables annually.',
                        date: '2024-03-15',
                        location: 'Casablanca, Morocco',
                        category: 'Press Release',
                        image: '../images/news/press-1.jpg',
                        author: 'SkyFarms Team'
                    },
                    // More press releases...
                ],
                'research': [
                    {
                        id: 'r1',
                        title: 'New Study Shows 95% Water Reduction in Vertical Farming',
                        excerpt: 'Research conducted at our Innovation Center demonstrates significant resource savings.',
                        date: '2024-03-10',
                        category: 'Research',
                        image: '../images/news/research-1.jpg',
                        author: 'Dr. Sarah Ahmed'
                    },
                    // More research items...
                ],
                'media': [
                    {
                        id: 'm1',
                        title: 'SkyFarms Featured in Global Agriculture Report',
                        excerpt: 'Leading industry publication highlights our innovative approach to urban farming.',
                        date: '2024-03-05',
                        category: 'Media Coverage',
                        image: '../images/news/media-1.jpg',
                        source: 'AgTech Weekly'
                    },
                    // More media items...
                ]
            };

            return {
                items: newsItems[category] || Object.values(newsItems).flat(),
                hasMore: page < 3 // Example pagination logic
            };
        } catch (error) {
            console.error('Error fetching news:', error);
            throw error;
        }
    }

    static async getHighlights() {
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));

            return [
                {
                    id: 'h1',
                    title: 'SkyFarms Expands to Southern Europe',
                    excerpt: 'New partnership announced with leading Mediterranean agricultural institutions',
                    image: '../images/news/highlight-1.jpg',
                    category: 'Breaking News'
                },
                // More highlights...
            ];
        } catch (error) {
            console.error('Error fetching highlights:', error);
            throw error;
        }
    }
}

export default NewsService; 