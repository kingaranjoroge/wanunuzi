import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import config from "../../../Config.js";

const SavingsDashboard = () => {
  const [savingsData, setSavingsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const decoded = jwt_decode(token);
        const decodedUserId = decoded.userId;

        const response = await axios.get(`${config.BASE_API_URL}/savings-dashboard/${decodedUserId}`);
        const convertedData = convertDatesToEAT(response.data);
        setSavingsData(convertedData);
      } catch (error) {
        console.error('Error retrieving savings data:', error);
      }
    };

    fetchData();
  }, []);

  // Function to convert dates to East African Time (EAT)
  const convertDatesToEAT = (data) => {
    return data.map((item) => {
      const date = new Date(item.date);
      const convertedDate = date.toLocaleString('en-US', {
        timeZone: 'Africa/Nairobi',
      });
      return { ...item, date: convertedDate };
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-3xl font-bold mt-8 mb-4 text-green-800">Savings Dashboard</h2>
      <div className="w-full sm:w-3/4 md:w-2/4 lg:w-1/2 xl:w-1/3">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-green-600 border">Index</th>
              <th className="py-2 px-4 bg-green-600 border">Date</th>
              <th className="py-2 px-4 bg-green-600 border">Amount</th>
              <th className="py-2 px-4 bg-green-600 border">Balance</th>
            </tr>
          </thead>
          <tbody>
            {savingsData.map((item, index) => (
              <tr key={item.id}>
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4 border">{item.date}</td>
                <td className="py-2 px-4 border">{item.amount}</td>
                <td className="py-2 px-4 border">{item.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SavingsDashboard;
