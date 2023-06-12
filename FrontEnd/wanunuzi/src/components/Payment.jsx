import React, { useState } from 'react';
import axios from 'axios';

const Payment = () => {
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/payment', {
        "BusinessShortCode": 174379,
        "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjMwNjA5MTI1MTIw",
        "Timestamp": "20230609125120",
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phoneNumber,
        "PartyB": 174379,
        "PhoneNumber": phoneNumber,
        "CallBackURL": "https://mydomain.com/path",
        "AccountReference": "CompanyXLTD",
        "TransactionDesc": "Payment of X"
      }, {
        headers: {
          'Authorization': 'Basic WjFPc0h0OXY2dnpkZHFyc3hTV0dodng2VmVoQ2lBSUc6SDZ2SWNOVHVCN0ZRU0JEeA=='
        }
      });

      setResponseData(response.data);
      setError(null); // Reset any previous error
    } catch (error) {
      setError(error.message);
      setResponseData(null); // Reset any previous response data
    }
  };

  return (
    <div className="w-full flex flex-col place-items-center h-[90vh] justify-center">
      <form className="w-80 flex flex-col gap-3 justify-center place-content-center place-items-center" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold text-green-900">Payment</h2>
        {error && <p className="text-red-500">{error}</p>} {/* Display error message if it exists */}
        {responseData && <pre>{JSON.stringify(responseData, null, 2)}</pre>} {/* Display response data if it exists */}
        <input className="input input-bordered w-full max-w-xs"
            type="text"
            id="amount"
            placeholder='Enter Amount'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <input className="input input-bordered w-full max-w-xs"
            type="text"
            id="phoneNumber"
            placeholder='Enter Phone Number'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        <button className="btn w-full bg-customGreen text-white ring-2 ring-customGreen hover:text-gray-800" type="submit">Pay</button>
      </form>
    </div>
  );
};

export default Payment;