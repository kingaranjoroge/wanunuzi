import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [response, setResponse] = useState('')
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a request to your server-side API endpoint for initiating the payment
      // Pass the amount and phone number as part of the request payload
      await axios.post('http://localhost:3000/payment', { amount, phoneNumber });
      
      // Handle the successful response or perform any necessary actions
      setPaymentStatus('Payment initiated successfully');
      handleAmount(); // Call handleAmount after successful payment initiation
      
    } catch (error) {
      setPaymentStatus('Failed to initiate payment');
    }

    // Clear the form after submitting
    setAmount('');
    setPhoneNumber('');
  };

  const handleAmount = () => {
    const requiredAmount = 1200;

    if (amount === '') {
      // No amount entered
      setResponse('Please enter the required amount (1200)')
    } else if (parseInt(amount) === requiredAmount) {
      // Amount is equal to the required amount
      navigate('/home'); // Navigate to homepage
    } else if (parseInt(amount) < requiredAmount) {
      // Amount is less than the required amount
      setResponse('Please enter the required amount (1200)')
    } else {
      // Amount is greater than the required amount
      setResponse('The required amount is (1200)')
    }
  };

  return (
    <div className="w-full flex flex-col place-items-center h-[90vh] justify-center">
      <form className="w-80 flex flex-col gap-3 justify-center place-content-center place-items-center" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold text-green-900">Payment</h2>
          <input className="input input-bordered w-full max-w-xs"
            type="text"
            id="amount"
            placeholder='Enter Amount(1200)'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <p className="text-red-500">{response}</p>
          <input className="input input-bordered w-full max-w-xs"
            type="text"
            id="phoneNumber"
            placeholder='Enter Phone Number'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        <button className="btn w-full bg-customGreen text-white ring-2 ring-customGreen hover:text-gray-800" type="button" onClick={handleAmount}>Pay</button>
      </form>
    </div>
  );
};

export default Payment;
