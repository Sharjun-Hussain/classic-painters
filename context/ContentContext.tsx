import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getHomepageData } from '../src/services/api';

interface ContentContextType {
    hero: any;
    gallery: any[];
    services: any[];
    testimonials: any[];
    settings: any;
    loading: boolean;
    error: any;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [data, setData] = useState<Omit<ContentContextType, 'loading' | 'error'>>({
        hero: null,
        gallery: [],
        services: [],
        testimonials: [],
        settings: {},
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getHomepageData();
                setData(result);
            } catch (err: any) {
                console.error("Error fetching content:", err);
                setError(err);
            } finally {
                // Add a minimum delay to prevent flashing if data loads too fast
                setTimeout(() => setLoading(false), 800);
            }
        };

        fetchData();
    }, []);

    return (
        <ContentContext.Provider value={{ ...data, loading, error }}>
            {children}
        </ContentContext.Provider>
    );
};

export const useContent = () => {
    const context = useContext(ContentContext);
    if (context === undefined) {
        throw new Error('useContent must be used within a ContentProvider');
    }
    return context;
};
