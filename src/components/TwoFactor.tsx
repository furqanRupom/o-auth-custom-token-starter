"use client";
import React, { useState, useEffect } from 'react';
import axiosInstance from '@/app/lib/nextAuthInsetptures';

const TwoFactorAuth: React.FC = () => {
    const [qrCodeData, setQrCodeData] = useState<string | null>(null);
    const [secretKey, setSecretKey] = useState<string>(''); // Secret key from backend
    const [token, setToken] = useState<string>(''); // User input for token
    const [message, setMessage] = useState<string>(''); // Feedback message for the user

    // Fetch the QR code and secret from the backend when the component mounts
    useEffect(() => {
        const fetchQRCode = async () => {
            try {
                
                const { data } = await axiosInstance.get('/user/two-factor/generate'); // Adjust to your API route
                setQrCodeData(data.qrCodeDataURL); // Set the QR code image URL
                setSecretKey(data.secret); // Store the secret key
            } catch (error: any) {
                console.error(error);
                setMessage('Failed to load QR code. Please try again.');
            }
        };

        fetchQRCode(); // Call the function to fetch QR code
    }, []);

    // Function to verify the token (Enable 2FA)
    const handleVerifyToken = async () => {
        try {
            const response = await axiosInstance.post('/user/two-factor/verify', {
                token,
                secret: secretKey, // Send the secret to the backend for verification
            });
            setMessage(response.data.message); // Display the backend message
        } catch (error: any) {
            console.error(error);
            setMessage('Verification failed. Please check your token.');
        }
    };

    return (
        <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Two Factor Authenticator</h2>

            {/* QR Code Display */}
            {qrCodeData ? (
                <div className="bg-gray-100 p-4 rounded-lg space-y-2">
                    <div className="flex justify-center">
                        <img src={qrCodeData} alt="2FA QR Code" className="border border-gray-300 rounded-md" />
                    </div>
                </div>
            ) : (
                <p>Loading QR code...</p>
            )}

            {/* Input field for token */}
            <div className="mt-4">
                <input
                    type="text"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="Enter 6-digit token"
                    className="w-full p-2 rounded-md border border-gray-300"
                />
            </div>

            {/* Enable Button */}
            <div className="flex justify-center mt-6">
                <button
                    onClick={handleVerifyToken}
                    className="bg-purple-600 text-white py-2 px-8 rounded-lg hover:bg-purple-700"
                    disabled={!token} // Disable button if no token
                >
                    Enable
                </button>
            </div>

            {/* Message Display */}
            {message && (
                <p className="mt-4 text-center text-green-600">{message}</p>
            )}
        </div>
    );
};

export default TwoFactorAuth;
