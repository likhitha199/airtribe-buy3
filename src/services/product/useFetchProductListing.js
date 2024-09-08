// services/product/useFetchProductListing.js
import { useState, useEffect } from 'react';

const useFetchProductListing = (endpoint) => {
    const [products, setProducts] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [loading, setLoading] = useState(true);
    const [errorState, setErrorState] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                
                const response = await fetch(`${endpoint}?page=${activePage}&limit=${limit}`);
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                setErrorState(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [activePage, limit]);

    return {
        products,
        activePage,
        limit,
        setActivePage,
        setLimit,
        loading,
        errorState
    };
};

export default useFetchProductListing;
