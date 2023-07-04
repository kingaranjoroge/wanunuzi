import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState(null);
  const [editedDetails, setEditedDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const decoded = jwt_decode(token);
        const decodedUserId = decoded.userId;

        const response = await axios.get(
          `http://localhost:3000/profile/${decodedUserId}`
        );
        setUserDetails(response.data);
        setEditedDetails(response.data); // Initialize edited details with the fetched data
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
      const decodedUserId = decoded.userId;

      await axios.put(
        `http://localhost:3000/profile/${decodedUserId}`,
        editedDetails
      );
      setUserDetails(editedDetails); // Update the displayed details with the edited details
      alert("User details updated successfully!");
    } catch (error) {
      console.error("Error updating user details:", error);
      alert("Error updating user details. Please try again.");
    }
  };

  const handleViewNextOfKin = () => {
    navigate('/profile/nextOfKin');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-lightgreen">
      {isLoading ? (
        <p>Loading user details...</p>
      ) : userDetails ? (
        <form className="bg-white p-6 rounded shadow-lg sm:w-3/4 md:w-2/4 lg:w-1/2 xl:w-3/5">
          <h2 className="text-2xl mb-6 text-green-700 font-bold">User Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block mb-2" htmlFor="name">
                Name:
              </label>
              <input
                className="w-full px-4 py-2 border rounded border-green-600"
                type="text"
                id="name"
                name="name"
                value={editedDetails.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="email">
                Email:
              </label>
              <input
                className="w-full px-4 py-2 border rounded border-green-600"
                type="email"
                id="email"
                name="email"
                value={editedDetails.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="phoneNumber">
                Phone Number:
              </label>
              <input
                className="w-full px-4 py-2 border rounded border-green-600"
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={editedDetails.phoneNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="idNumber">
                ID Number:
              </label>
              <input
                className="w-full px-4 py-2 border rounded border-green-600"
                type="text"
                id="idNumber"
                name="idNumber"
                value={editedDetails.idNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="dob">
                Date of Birth:
              </label>
              <input
                className="w-full px-4 py-2 border rounded border-green-600"
                type="text"
                id="dob"
                name="dob"
                value={editedDetails.dob}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="gender">
                Gender:
              </label>
              <input
                className="w-full px-4 py-2 border rounded border-green-600"
                type="text"
                id="gender"
                name="gender"
                value={editedDetails.gender}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="status">
                Status:
              </label>
              <input
                className="w-full px-4 py-2 border rounded border-green-600"
                type="text"
                id="status"
                name="status"
                value={editedDetails.status}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="address">
                Address:
              </label>
              <input
                className="w-full px-4 py-2 border rounded border-green-600"
                type="text"
                id="address"
                name="address"
                value={editedDetails.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="kraPin">
                KRA PIN:
              </label>
              <input
                className="w-full px-4 py-2 border rounded border-green-600"
                type="text"
                id="kraPin"
                name="kraPin"
                value={editedDetails.kraPin}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 justify-between">
            <div className="mb-4 col-span-1 w-full">
              <button
                className="px-4 py-2 bg-red-800 text-white rounded w-full"
                type="button"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
            </div>
            <div className="mb-4 col-span-1 w-full">
              <button
                className="px-4 py-2 bg-red-800 text-white rounded w-full"
                type="button"
                onClick={handleViewNextOfKin}
              >
                View Next of Kin
              </button>
            </div>
          </div>
        </form>
      ) : (
        <p>Error fetching user details.</p>
      )}
    </div>
  );
};

export default Profile;
