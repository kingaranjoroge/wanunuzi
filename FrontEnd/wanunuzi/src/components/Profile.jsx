import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

const Profile = () => {
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

  return (
    <div className="flex items-center justify-center h-screen bg-lightgreen">
      {isLoading ? (
        <p>Loading user details...</p>
      ) : userDetails ? (
        <form className="bg-white p-6 rounded shadow-lg">
          <h2 className="text-2xl mb-6">User Details</h2>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="name">
              Name:
            </label>
            <input
              className="w-full px-4 py-2 border rounded"
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
              className="w-full px-4 py-2 border rounded"
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
              className="w-full px-4 py-2 border rounded"
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
              className="w-full px-4 py-2 border rounded"
              type="text"
              id="idNumber"
              name="idNumber"
              value={editedDetails.idNumber}
              onChange={handleInputChange}
            />
          </div>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            type="button"
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>
        </form>
      ) : (
        <p>Error fetching user details.</p>
      )}
    </div>
  );
};

export default Profile;
