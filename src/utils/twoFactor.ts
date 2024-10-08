// api/twoFactor.ts

import axiosInstance from "@/app/lib/nextAuthInsetptures";

export const generate2FA = async () => {
    try {
        const response = await axiosInstance.get('/user/two-factor/generate');
        return response.data; 
    } catch (error) {
        console.error('Error generating 2FA:', error);
        throw error;
    }
};

export const verify2FA = async (token: string) => {
    try {
        const response = await axiosInstance.post('/user/two-factor/verify', { token });
        return response.data; 
    } catch (error) {
        console.error('Error verifying 2FA token:', error);
        throw error;
    }
};
