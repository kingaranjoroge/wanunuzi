import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import config from '../../../Config.js';
import jwt_decode from 'jwt-decode';


const CompleteSignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    dob: '',
    gender: '',
    status: '',
    address: '',
    kraPin: '',
    nextOfKin: {
      name: '',
      dob: '',
      id: '',
      phone: '',
      email: '',
      kraPin: '',
    },
  })

  const [errorMessage, setErrorMessage] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const decoded = jwt_decode(token);
        const userId = decoded.userId;

        const response1 = await axios.get(`${config.BASE_API_URL}/compare-user-details/${userId}`);
        const userDetails = response1.data.data.user;
        setUserDetails(userDetails);

        console.log(userDetails);

        // Check if any of the nextOfKin details match the user's own details
        if (
          formData.nextOfKin.email === userDetails.email ||
          formData.nextOfKin.phone === userDetails.phoneNumber ||
          formData.nextOfKin.kraPin === userDetails.kraPin ||
          formData.nextOfKin.id === userDetails.idNumber
        ) {
          // Show an error message and disable the submit button
          setErrorMessage('Next of kin details cannot be the same as your own details.');
          setIsButtonDisabled(true);
        } else {
          // Reset the error message and enable the submit button
          setErrorMessage('');
          setIsButtonDisabled(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Check if the input field is for date of birth
    if (name === 'dob') {
      // Transform the date format from dd/mm/yy to yyyy-mm-dd
      const [day, month, year] = value.split('/');
      const formattedDate = `20${year}-${month}-${day}`;
      
      setFormData((prevData) => ({
        ...prevData,
        dob: formattedDate,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  

  const handleNextOfKinChange = (e) => {
    const { name, value } = e.target;
    const updatedNextOfKin = {
      ...formData.nextOfKin,
      [name]: value,
    };

    // Check if any of the nextOfKin details match the user's own details
    if (
      updatedNextOfKin.email === userDetails.email ||
      updatedNextOfKin.phone === userDetails.phoneNumber ||
      updatedNextOfKin.kraPin === userDetails.kraPin ||
      updatedNextOfKin.id === userDetails.idNumber
    ) {
      // Show an error message and disable the submit button
      setErrorMessage('Next of kin details cannot be the same as your own details.');
      setIsButtonDisabled(true);
    } else {
      // Reset the error message and enable the submit button
      setErrorMessage('');
      setIsButtonDisabled(false);
    }

    setFormData((prevData) => ({
      ...prevData,
      nextOfKin: updatedNextOfKin,
    }));
  };


  const handleDOBChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      dob: date,
    }));
  };

  const handleNextOfKinDOBChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      nextOfKin: {
        ...prevData.nextOfKin,
        dob: date,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { nextOfKin, ...userData } = formData;
  
    try {

      const res = await axios.post(`${config.BASE_API_URL}/complete-registration`, userData);
  
      console.log('UserData sent successfully!');
  
      const token = localStorage.getItem('token');
      const decoded = jwt_decode(token);
      const userId = decoded.userId;
  
      const response = await axios.post(`${config.BASE_API_URL}/nextOfKin`, { nextOfKin, userId });
      console.log('Next of Kin data sent successfully!');
  
      navigate('/payment');
    } catch (error) {
      console.error('Error sending UserData:', error);
    }
  };
  

  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="bg-white p-6 rounded shadow-lg h-3/5 w-3/5">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4 sm:flex-row">
            <div className="w-full sm:mr-6">
              <h2 className="text-1xl font-bold text-green-900">User Details</h2>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium" htmlFor="dob">
                  DOB<span className="text-red-500">*</span>:
                </label>
                <DatePicker
                  className="input input-bordered input-success w-full max-w-xs"
                  selected={formData.dob}
                  onChange={handleDOBChange}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="yyyy-MM-dd" // Set the placeholder text
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium" htmlFor="gender">
                  Gender:
                </label>
                <select
                  className="input input-bordered input-success w-full max-w-xs"
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium" htmlFor="status">
                  Status:
                </label>
                <select
                  className="input input-bordered input-success w-full max-w-xs"
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="">Select Status</option>
                  <option value="married">Married</option>
                  <option value="single">Single</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium" htmlFor="address">
                  Address:
                </label>
                <input
                  className="input input-bordered input-success w-full max-w-xs"
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium" htmlFor="kraPin">
                  KRA Pin<span className="text-red-500">*</span>:
                </label>
                <input
                  className="input input-bordered input-success w-full max-w-xs"
                  type="text"
                  id="kraPin"
                  name="kraPin"
                  value={formData.kraPin}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="w-full sm:ml-6">
              <h2 className="text-1xl font-bold text-green-900">Next of Kin</h2>
              <div className="mb-4">
                <label className="block mb-2 texbold" htmlFor="name">
                  Name<span className="text-red-500">*</span>:
                </label>
                <input
                  className="input input-bordered input-success w-full max-w-xs"
                  type="text"
                  id="name"
                  name="name"
                  value={formData.nextOfKin.name}
                  onChange={handleNextOfKinChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium" htmlFor="nextOfKinDob">
                  DOB<span className="text-red-500">*</span>:
                </label>
                <DatePicker
                  className="input input-bordered input-success w-full max-w-xs"
                  selected={formData.nextOfKin.dob}
                  onChange={handleNextOfKinDOBChange}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="yyyy-MM-dd"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium" htmlFor="id">
                  ID/Birth Certificate<span className="text-red-500">*</span>:
                </label>
                <input
                  className="input input-bordered input-success w-full max-w-xs"
                  type="text"
                  id="id"
                  name="id"
                  value={formData.nextOfKin.id}
                  onChange={handleNextOfKinChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium" htmlFor="phone">
                  Phone<span className="text-red-500">*</span>:
                </label>
                <input
                  className="input input-bordered input-success w-full max-w-xs"
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.nextOfKin.phone}
                  onChange={handleNextOfKinChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium" htmlFor="email">
                  Email<span className="text-red-500">*</span>:
                </label>
                <input
                  className="input input-bordered input-success w-full max-w-xs"
                  type="email"
                  id="email"
                  name="email"
                  value={formData.nextOfKin.email}
                  onChange={handleNextOfKinChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium" htmlFor="nextOfKinKraPin">
                  KRA Pin<span className="text-red-500">*</span>:
                </label>
                <input
                  className="input input-bordered input-success w-full max-w-xs"
                  type="text"
                  id="nextOfKinKraPin"
                  name="kraPin"
                  value={formData.nextOfKin.kraPin}
                  onChange={handleNextOfKinChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="text-center">
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <button
              className="btn w-full md:w-1/2 mt-0.5 bg-green-400 ring-red-500 ring-offset-2 ring-2"
              type="submit"
              disabled={isButtonDisabled} // Disable the button based on the state
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompleteSignUp