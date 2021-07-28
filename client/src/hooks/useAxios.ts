import axiosLib from 'axios';

/**
 * Hook para uso do axios
 */
export function useAxios() { 
    const axios = axiosLib.create({
        baseURL: process.env.REACT_APP_API_URL,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return { axios };
};