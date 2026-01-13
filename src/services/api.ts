import axios from 'axios';

// Base URL for the backend API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Create axios instance with default config
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 seconds
});

// ==================== HERO SECTION ====================
export const heroApi = {
    /**
     * Get hero section content
     * @returns {Promise} Hero section data
     */
    getHero: async () => {
        try {
            const response = await apiClient.get('/api/hero');
            return response.data;
        } catch (error) {
            console.error('Failed to fetch hero data:', error);
            throw error;
        }
    },
};

// ==================== GALLERY ====================
export const galleryApi = {
    /**
     * Get all gallery images
     * @returns {Promise} Array of gallery images
     */
    getImages: async () => {
        try {
            const response = await apiClient.get('/api/gallery');
            return response.data;
        } catch (error) {
            console.error('Failed to fetch gallery images:', error);
            throw error;
        }
    },

    /**
     * Get images by category
     * @param {string} category - Category to filter by
     * @returns {Promise} Filtered array of images
     */
    getImagesByCategory: async (category: string) => {
        try {
            const response = await apiClient.get('/api/gallery');
            return response.data.filter((img: any) => img.category === category);
        } catch (error) {
            console.error('Failed to fetch gallery images by category:', error);
            throw error;
        }
    },
};

// ==================== SERVICES ====================
export const servicesApi = {
    /**
     * Get all services
     * @returns {Promise} Array of services
     */
    getServices: async () => {
        try {
            const response = await apiClient.get('/api/services');
            return response.data;
        } catch (error) {
            console.error('Failed to fetch services:', error);
            throw error;
        }
    },
};

// ==================== TESTIMONIALS ====================
export const testimonialsApi = {
    /**
     * Get all testimonials
     * @returns {Promise} Array of testimonials
     */
    getTestimonials: async () => {
        try {
            const response = await apiClient.get('/api/testimonials');
            return response.data;
        } catch (error) {
            console.error('Failed to fetch testimonials:', error);
            throw error;
        }
    },
};

// ==================== SITE SETTINGS ====================
export const settingsApi = {
    /**
     * Get site settings (navbar, footer, social links)
     * @returns {Promise} Site settings data
     */
    getSettings: async () => {
        try {
            const response = await apiClient.get('/api/settings');
            return response.data;
        } catch (error) {
            console.error('Failed to fetch settings:', error);
            throw error;
        }
    },
};

// ==================== CONTACT ====================
export const contactApi = {
    /**
     * Send contact form data
     * @param {Object} data - Form data (name, email, phone, service, message)
     * @returns {Promise} Response data
     */
    sendContactForm: async (data: { name: string; email: string; phone: string; service: string; message: string }) => {
        try {
            const response = await apiClient.post('/api/contact', data);
            return response.data;
        } catch (error) {
            console.error('Failed to send contact form:', error);
            throw error;
        }
    },
};

// ==================== PAGE SECTIONS ====================
export const sectionsApi = {
    /**
     * Get section content by key
     * @param {string} key - Section key (e.g., 'about', 'trust_bar', 'why_choose_us')
     * @returns {Promise} Section data
     */
    getSection: async (key: string) => {
        try {
            const response = await apiClient.get(`/api/section?key=${key}`);
            return response.data;
        } catch (error) {
            console.error(`Failed to fetch section ${key}:`, error);
            throw error;
        }
    },

    /**
     * Get multiple sections at once
     * @param {string[]} keys - Array of section keys
     * @returns {Promise} Object with section data keyed by section key
     */
    getSections: async (keys: string[]) => {
        try {
            const promises = keys.map(key => sectionsApi.getSection(key));
            const results = await Promise.all(promises);

            return keys.reduce((acc, key, index) => {
                acc[key] = results[index];
                return acc;
            }, {} as Record<string, any>);
        } catch (error) {
            console.error('Failed to fetch sections:', error);
            throw error;
        }
    },
};

// ==================== COMBINED API ====================
/**
 * Fetch all homepage data in one call
 * @returns {Promise} Object containing all homepage data
 */
export const getHomepageData = async () => {
    try {
        const [hero, gallery, services, testimonials, settings] = await Promise.all([
            heroApi.getHero(),
            galleryApi.getImages(),
            servicesApi.getServices(),
            testimonialsApi.getTestimonials(),
            settingsApi.getSettings(),
        ]);

        return {
            hero,
            gallery,
            services,
            testimonials,
            settings,
        };
    } catch (error) {
        console.error('Failed to fetch homepage data:', error);
        throw error;
    }
};

// Export default object with all APIs
export default {
    hero: heroApi,
    gallery: galleryApi,
    services: servicesApi,
    testimonials: testimonialsApi,
    settings: settingsApi,
    sections: sectionsApi,
    contact: contactApi,
    getHomepageData,
};
