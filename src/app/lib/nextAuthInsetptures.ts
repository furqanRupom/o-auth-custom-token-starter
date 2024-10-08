// lib/nextAuthInsetptures.ts
import axios from 'axios';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/options';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
});

// Set up an interceptor to add the Authorization header
axiosInstance.interceptors.request.use(
    async (config) => {
        const session = await getServerSession(authOptions);
        const cookiesToken = session?.accessToken;
        if (cookiesToken) {
            config.headers['Authorization'] = `${cookiesToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
