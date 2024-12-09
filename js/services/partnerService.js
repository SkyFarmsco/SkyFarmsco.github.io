class PartnerService {
    static async getPartners() {
        try {
            const response = await fetch('/data/partners.json');
            return await response.json();
        } catch (error) {
            console.error('Error fetching partners:', error);
            throw error;
        }
    }

    static async getPartnerLogos() {
        try {
            const partners = await this.getPartners();
            return partners.map(partner => ({
                id: partner.id,
                name: partner.name,
                logo: partner.logo
            }));
        } catch (error) {
            console.error('Error fetching partner logos:', error);
            throw error;
        }
    }
}

export default PartnerService; 