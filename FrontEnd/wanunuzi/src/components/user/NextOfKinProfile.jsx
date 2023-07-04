import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

const NextOfKinProfile = () => {
  const [nextOfKinDetails, setNextOfKinDetails] = useState(null);
  const [editedDetails, setEditedDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNextOfKinDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const decoded = jwt_decode(token);
        const decodedUserId = decoded.userId; // Implement this function to extract userId from the URL params

        const response = await axios.get(
          `http://localhost:3000/nextOfKin/${decodedUserId}`
        );
        setNextOfKinDetails(response.data);
        setEditedDetails(response.data); // Initialize edited details with the fetched data
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching Next of Kin details:", error);
        setIsLoading(false);
      }
    };

    fetchNextOfKinDetails();
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
        const decodedUserId = decoded.userId; // Implement this function to extract userId from the URL params

      await axios.put(
        `http://localhost:3000/nextOfKin/${decodedUserId}`,
        editedDetails
      );
      setNextOfKinDetails(editedDetails); // Update the displayed details with the edited details
      alert("Next of Kin details updated successfully!");
    } catch (error) {
      console.error("Error updating Next of Kin details:", error);
      alert("Error updating Next of Kin details. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-lightgreen">
      {isLoading ? (
        <p>Loading Next of Kin details...</p>
      ) : nextOfKinDetails ? (
        <form className="bg-white p-6 rounded shadow-lg sm:w-3/4 md:w-2/4 lg:w-1/2 xl:w-3/5">
          <h2 className="text-2xl mb-6 text-green-700 font-bold">Next of Kin Details</h2>
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
          <div className="flex justify-center items-center mb-4 col-span-1 w-full">
            <button
                className="px-4 py-2 bg-red-800 text-white rounded w-50%"
                type="button"
                onClick={handleSaveChanges}
            >
                Save Changes
            </button>
          </div>
        </form>
      ) : (
        <p>Error fetching Next of Kin details.</p>
      )}
    </div>
  );
};

export default NextOfKinProfile;
