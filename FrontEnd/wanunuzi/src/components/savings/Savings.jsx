import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import config from "../../../Config.js";

const Savings = () => {
  const [savingsBalance, setSavingsBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem("token");
        const decoded = jwt_decode(token);
        const decodedUserId = decoded.userId;

        const response = await axios.get(`${config.BASE_API_URL}/savingsBalance/${decodedUserId}`);
        setSavingsBalance(response.data.balance);
      } catch (error) {
        console.error('Error retrieving savings balance:', error);
      }
    };

    fetchBalance();
  }, []);

  const handleDeposit = async () => {
    try {
      const token = localStorage.getItem('token');
      const decoded = jwt_decode(token);
      const userId = decoded.userId;
  
      const depositData = {
        amount: parseFloat(amount),
        phoneNumber,
        userId
      };
  
      const response = await axios.post('http://localhost:3000/deposit', depositData);
      setSavingsBalance(response.data.newBalance);
      setAmount('');
      setPhoneNumber('');
    } catch (error) {
      console.error('Error making savings deposit:', error);
    }
  };
  

  return (
    <div className="w-full flex flex-col place-items-center h-[90vh] justify-center">
      <form className="w-80 flex flex-col gap-0.1 justify-center place-content-center place-items-center">
        <h2 className="text-3xl font-bold text-green-900">Savings</h2>
        <p className="text-green-900 mb-3">Current Balance: {savingsBalance}</p>
        <input
          className="input input-bordered w-full max-w-xs mb-3"
          type="number"
          id="amount"
          placeholder="Enter Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
        <br />
        <input
          className="input input-bordered w-full max-w-xs mb-3"
          type="text"
          id="phoneNumber"
          placeholder="Enter Phone Number"
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
        />
        <br />
        <button
          className="btn w-full bg-customGreen text-white ring-2 ring-customGreen hover:text-gray-800"
          type="button"
          onClick={handleDeposit}
        >
          Deposit
        </button>
      </form>
    </div>
  );
};

export default Savings;
