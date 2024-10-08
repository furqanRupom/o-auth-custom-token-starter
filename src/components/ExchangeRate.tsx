"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExchangeRateComponent: React.FC = () => {
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('NGN');
    const [amount, setAmount] = useState<number>(150);
    const [exchangeRate, setExchangeRate] = useState<number>(0);
    const [fees, setFees] = useState<number>(3.5);
    const [totalPayable, setTotalPayable] = useState<number>(0);
    const [convertedAmount, setConvertedAmount] = useState<number>(0);
    const [currencies, setCurrencies] = useState<{ code: string; name: string }[]>([]);
    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const response = await axios.get('https://diasporex-api.vercel.app/api/v1/currency?limit=11');
                const data = response.data;
                if (data.success) {
                    setCurrencies(data.data);
                }
            } catch (error) {
                console.error('Error fetching currencies:', error);
            }
        };

        fetchCurrencies();
    }, []);

    useEffect(() => {
        const fetchExchangeRate = async () => {
            try {
                const response = await axios.get('https://diasporex-api.vercel.app/api/v1/currency/exchange-rate', {
                    params: {
                        fromCode: fromCurrency,
                        toCode: toCurrency,
                        amount,
                    },
                });
                const data = response.data.data;
                setExchangeRate(data.exchangeRate);
                setConvertedAmount(data.convertedAmount);
                setTotalPayable(data.totalPayableAmount);
            } catch (error) {
                console.error('Error fetching exchange rate:', error);
            }
        };

        fetchExchangeRate();
    }, [fromCurrency, toCurrency, amount]);

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Exchange Rate</h2>
            <p className="text-gray-700 text-center mb-4">
                1.00 {fromCurrency} = {exchangeRate?.toFixed(2)} {toCurrency}
            </p>

            <div className="mb-6">
                <label className="block text-gray-700 mb-2">You send exactly</label>
                <div className="flex items-center space-x-2">
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="border rounded-md p-2 w-full"
                    />
                    <select
                        value={fromCurrency}
                        onChange={(e) => setFromCurrency(e.target.value)}
                        className="border rounded-md p-2"
                    >
                        {currencies.map((currency) => (
                            <option key={currency.code} value={currency.code}>
                               {currency.code}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="mb-4">
                <p className="text-gray-700">
                    <span>Fees & Charges: </span>
                    <span>{fees.toFixed(2)} {fromCurrency}</span>
                </p>
                <p className="text-gray-700">
                    <span>Amount will convert: </span>
                    <span>{amount} {fromCurrency}</span>
                </p>
                <p className="text-gray-700">
                    <span>Total Payable Amount: </span>
                    <span>{totalPayable?.toFixed(2)} {fromCurrency}</span>
                </p>
            </div>

            <div className="mb-6">
                <label className="block text-gray-700 mb-2">Recipient gets</label>
                <div className="flex items-center space-x-2">
                    <input
                        type="number"
                        value={convertedAmount.toFixed(2)}
                        disabled
                        className="border rounded-md p-2 w-full"
                    />
                    <select
                        value={toCurrency}
                        onChange={(e) => setToCurrency(e.target.value)}
                        className="border rounded-md p-2"
                    >
                        {currencies.map((currency) => (
                            <option key={currency.code} value={currency.code}>
                              {currency.code}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Receive Method</label>
                <select className="border rounded-md p-2 w-full">
                    <option value="bankTransfer">Bank Transfer</option>
                    {/* Add more receiving options */}
                </select>
            </div>

            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 w-full">
                Send Now
            </button>

            <p className="text-sm text-gray-500 mt-4 text-center">
                You could save up to 1.5 USD
            </p>
        </div>
    );
};

export default ExchangeRateComponent;
