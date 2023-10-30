import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory hook to perform navigation
import jwt_decode from 'jwt-decode';
import { getPaymentStatus } from '../../api'; // Replace with the actual path to api.js
import TestNav from "../navbar/testNav.jsx";
// import config from "../../../Config.js";


const SavingsTypes = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Function to get the payment status when the component mounts
    const fetchPaymentStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        const decoded = jwt_decode(token);
        const userId = decoded.userId;

        const status = await getPaymentStatus(userId); // Replace `userId` with the actual user ID
        setPaymentStatus(status);
      } catch (error) {
        // Handle error if needed
      }
    };

    fetchPaymentStatus();
  }, []);

  // Function to handle navigation based on paymentStatus
  const handleNavigation = (pathname) => {
    if (paymentStatus === false) {
      navigate(`/payment`); // Navigate to the payment page if paymentStatus is false
    } else {
      navigate(pathname); // Navigate to the corresponding pathname if paymentStatus is true
    }
  };

  return (
    <div className={'w-full overflow-clip'}>
      <TestNav />
      <h1 className={'items-center flex justify-center w-full text-3xl font-bold mt-12'}>Choose Savings Type</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 p-4 w-full overflow-clip gap-4">
        {/* Section 1 */}
        <div className="card lg:card-side bg-base-100 border-2 rounded-3xl shadow-sm">
          <figure className={'h-full lg:w-1/2'}><img className={'h-full bg-cover'} src="/images/money.jpg" alt="Album"/></figure>
          <div className="card-body p-3 md:p-5">
              <h2 className="card-title">Normal Savings</h2>
              
          </div>
          <div className="card-actions justify-center items-center">
            <button
              className="btn hover:bg-red-700 btn-outline rounded-3xl w-full ring-2 ring-customGreen ring-offset-2"
              onClick={() => handleNavigation('/savings')}
            >
              Save <i className="fa-solid fa-circle-check"></i>
            </button>
          </div>
        </div>

        {/* Section 2 */}
        <div className="card lg:card-side bg-base-100 border-2 rounded-3xl shadow-sm">
        <figure className={'h-full lg:w-1/2'}><img className={'h-full bg-cover'} src="../../../public/images/cash.jpg" alt="Album"/></figure>
          <div className="card-body p-3 md:p-5">
              <h2 className="card-title">Savings-Type2</h2>              
          </div>
          <div className="card-actions justify-end">
            <button
              className="btn hover:bg-red-700 btn-outline rounded-3xl w-full ring-2 ring-customGreen ring-offset-2"
              onClick={() => handleNavigation('/savings-type2')}
            >
              Save <i className="fa-solid fa-circle-check"></i>
            </button>
          </div>
        </div>

        {/* Section 3 */}
        <div className="card lg:card-side bg-base-100 border-2 rounded-3xl shadow-sm">
        <figure className={'h-full lg:w-1/2'}><img className={'h-full bg-cover'} src="../../../public/images/kenya.jpg" alt="Album"/></figure>
          <div className="card-body p-3 md:p-5">
              <h2 className="card-title">Savings-Type3</h2>
              
          </div>
          <div className="card-actions justify-end">
            <button
              className="btn hover:bg-red-700 btn-outline rounded-3xl w-full ring-2 ring-customGreen ring-offset-2"
              onClick={() => handleNavigation('/savings-type3')}
            >
              Save <i className="fa-solid fa-circle-check"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingsTypes;
