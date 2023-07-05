import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/signup');
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (userId) => {
    // Implement edit functionality
  };

  const handleDelete = (userId) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this user?');
    if (shouldDelete) {
      // Implement delete functionality
    }
  };

  return (
    <table className="min-w-full">
      <thead>
        <tr>
          <th className="px-4 py-2">Full Name</th>
          <th className="px-4 py-2">Email</th>
          <th className="px-4 py-2">Phone Number</th>
          <th className="px-4 py-2">ID Number</th>
          <th className="px-4 py-2">KRA Pin</th>
          <th className="px-4 py-2">DOB</th>
          <th className="px-4 py-2">Gender</th>
          <th className="px-4 py-2">Status</th>
          <th className="px-4 py-2">Phone Adress</th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td className="border px-4 py-2">{user.fullName}</td>
            <td className="border px-4 py-2">{user.email}</td>
            <td className="border px-4 py-2">{user.phoneNumber}</td>
            <td className="border px-4 py-2">{user.idNumber}</td>
            <td className="border px-4 py-2">{user.kraPin}</td>
            <td className="border px-4 py-2">{user.DOB}</td>
            <td className="border px-4 py-2">{user.Gender}</td>
            <td className="border px-4 py-2">{user.Status}</td>
            <td className="border px-4 py-2">{user.Address}</td>
            <td className="border px-4 py-2">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={() => handleEdit(user.id)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ManageUsers;
