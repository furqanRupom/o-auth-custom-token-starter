// lib/axios.ts
import axios from 'axios';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/options';

const axiosInstance = axios.create({
    baseURL: 'https://diasporex-api.vercel.app/api/v1', 
});
let authToken: string | null = typeof window !== "undefined" ? localStorage.getItem('accessToken') : null;

axiosInstance.interceptors.request.use(
    async (config) => {
        const session = await getServerSession(authOptions);
        if (session?.accessToken || authToken) {
            config.headers['Authorization'] = `${session?.accessToken || authToken}`; 
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
