import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
    const navigate = useNavigate()

  const [user, setUser] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    idNumber: '',
    kraPin: '',
    DOB: '',
    Gender: '',
    Status: '',
    Address: '',
    password: ''
  });

  const handleChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        idNumber: user.idNumber,
        kraPin: user.kraPin,
        DOB: user.DOB,
        Gender: user.Gender,
        Status: user.Status,
        Address: user.Address,
        password: user.password
      };
  
      // Send the new user data to the server
      await axios.post('http://localhost:3000/signup', newUser);
  
      // Clear the form
      setUser({
        fullName: '',
        email: '',
        phoneNumber: '',
        idNumber: '',
        kraPin: '',
        DOB: '',
        Gender: '',
        Status: '',
        Address: '',
        password: ''
      });
  
      navigate("/manage-users");
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className="w-full flex flex-col place-items-center mt-10 h-fit md:h-[90vh] justify-center">
      <h1 className="text-3xl font-bold mb-4">Add User</h1>
      <form className="grid grid-cols-2 gap-4 w-80 md:w-1/2" onSubmit={handleSubmit}>
        <div className="col-span-1">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Full Name:
            <input
              className="input input-bordered input-success w-full max-w-xs"
              type="text"
              name="fullName"
              value={user.fullName}
              onChange={handleChange}
            />
          </label>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Email:
            <input
              className="input input-bordered input-success w-full max-w-xs"
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </label>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Phone Number:
            <input
              className="input input-bordered input-success w-full max-w-xs"
              type="text"
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={handleChange}
            />
          </label>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            ID Number:
            <input
              className="input input-bordered input-success w-full max-w-xs"
              type="text"
              name="idNumber"
              value={user.idNumber}
              onChange={handleChange}
            />
          </label>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            KRA Pin:
            <input
              className="input input-bordered input-success w-full max-w-xs"
              type="text"
              name="kraPin"
              value={user.kraPin}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="col-span-1">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            DOB:
            <input
              className="input input-bordered input-success w-full max-w-xs"
              type="date"
              name="DOB"
              value={user.DOB}
              onChange={handleChange}
            />
          </label>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Gender:
            <input
              className="input input-bordered input-success w-full max-w-xs"
              type="text"
              name="Gender"
              value={user.Gender}
              onChange={handleChange}
            />
          </label>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Status:
            <input
              className="input input-bordered input-success w-full max-w-xs"
              type="text"
              name="Status"
              value={user.Status}
              onChange={handleChange}
            />
          </label>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Address:
            <input
              className="input input-bordered input-success w-full max-w-xs"
              type="text"
              name="Address"
              value={user.Address}
              onChange={handleChange}
            />
          </label>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Password:
            <input
              className="input input-bordered input-success w-full max-w-xs"
              type="text"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
          </label>
        </div>
        <button className="btn w-full md:w-1/2 mt-3 bg-green-400 ring-red-500 ring-offset-2 ring-2" type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
