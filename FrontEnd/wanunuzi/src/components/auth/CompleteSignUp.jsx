import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from "react-router-dom";

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
  });

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
    setFormData((prevData) => ({
      ...prevData,
      nextOfKin: {
        ...prevData.nextOfKin,
        [name]: value,
      },
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
    navigate("/payment");
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
                  className="w-full px-4 py-2 border rounded border-green-400 focus:border-green-500"
                  selected={formData.dob}
                  onChange={handleDOBChange}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="dd/mm/yy" // Set the placeholder text
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium" htmlFor="gender">
                  Gender:
                </label>
                <select
                  className="w-full px-4 py-2 border rounded border-green-400 focus:border-green-500"
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
                  className="w-full px-4 py-2 border rounded border-green-400 focus:border-green-500"
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
                  className="w-full px-4 py-2 border rounded border-green-400 focus:border-green-500"
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
                  className="w-full px-4 py-2 border rounded border-green-400 focus:border-green-500"
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
                  className="w-full px-4 py-2 border rounded border-green-400 focus:border-green-500"
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
                  className="w-full px-4 py-2 border rounded border-green-400 focus:border-green-500"
                  selected={formData.dob}
                  onChange={handleDOBChange}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="dd/mm/yy" // Set the placeholder text
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium" htmlFor="id">
                  ID/Birth Certificate<span className="text-red-500">*</span>:
                </label>
                <input
                  className="w-full px-4 py-2 border rounded border-green-400 focus:border-green-500"
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
                  className="w-full px-4 py-2 border rounded border-green-400 focus:border-green-500"
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
                  className="w-full px-4 py-2 border rounded border-green-400 focus:border-green-500"
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
                  className="w-full px-4 py-2 border rounded border-green-400 focus:border-green-500"
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
            <button
              className="btn w-full md:w-1/2 mt-0.5 bg-green-400 ring-red-500 ring-offset-2 ring-2"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompleteSignUp;
