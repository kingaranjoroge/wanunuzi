import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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
    setUsers((prevUsers) => {
      return prevUsers.map((user) => {
        if (user.id === userId) {
          return { ...user, isEditing: true };
        }
        return user;
      });
    });
  };
  
  const handleSave = async (userId) => {
    try {
      const updatedUser = users.find((user) => user.id === userId);
  
      // Send the updated user data to the server
      await axios.put(`http://localhost:3000/signup/${userId}`, updatedUser);
  
      // Refresh the user list
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleCancel = (userId) => {
    setUsers((prevUsers) => {
      return prevUsers.map((user) => {
        if (user.id === userId) {
          return { ...user, isEditing: false };
        }
        return user;
      });
    });
  };
  

  const handleDelete = async (userId) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this user?');
    if (shouldDelete) {
      try {
        // Send a delete request to the server
        await axios.delete(`http://localhost:3000/signup/${userId}`);
    
        // Refresh the user list
        fetchUsers();
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Function to filter the users based on the search query
  // Function to filter the users based on the search query
const filteredUsers = users.filter((user) => {
  // Combine all fields except fullName for search
  const searchableFields = [
    user.fullName,
    user.email,
    user.phoneNumber,
    user.idNumber,
    user.kraPin,
    user.DOB,
    user.Gender,
    user.Status,
    user.Address
  ];

  // Check if any field contains the search query (non-null fields only)
  return searchableFields.some((field) =>
    field && field.toLowerCase().includes(searchQuery.toLowerCase())
  );
});
  

  return (
    <>
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <h1 className="btn btn-ghost normal-case text-xl text-green-700">Users</h1>
      </div>
      <div>
        <Link to="/add-user">
          <button className="btn btn-outline mr-4">Add User</button>
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
      </div>
    </div>
    <table className="min-w-full">
      <thead>
        <tr>
          <th className="px-4 py-2 bg-green-600 text-white">#</th>
          <th className="px-4 py-2 bg-green-600 text-white">Full Name</th>
          <th className="px-4 py-2 bg-green-600 text-white">Email</th>
          <th className="px-4 py-2 bg-green-600 text-white">Phone Number</th>
          <th className="px-4 py-2 bg-green-600 text-white">ID Number</th>
          <th className="px-4 py-2 bg-green-600 text-white">KRA Pin</th>
          <th className="px-4 py-2 bg-green-600 text-white">DOB</th>
          <th className="px-4 py-2 bg-green-600 text-white">Gender</th>
          <th className="px-4 py-2 bg-green-600 text-white">Status</th>
          <th className="px-4 py-2 bg-green-600 text-white">Address</th>
          <th className="px-4 py-2 bg-green-600 text-white">Actions</th>
        </tr>
      </thead>
      <tbody>
      {filteredUsers.map((user, index) => (
        <tr key={user.id}>
          <td className="border px-4 py-2">{index + 1}</td>
          <td className="border px-4 py-2">
            {user.isEditing ? (
              <input
                className="border rounded px-2 py-1"
                value={user.fullName}
                onChange={(e) => {
                  setUsers((prevUsers) => {
                    return prevUsers.map((prevUser) => {
                      if (prevUser.id === user.id) {
                        return { ...prevUser, fullName: e.target.value };
                      }
                      return prevUser;
                    });
                  });
                }}
              />
            ) : (
              user.fullName
            )}
          </td>
          <td className="border px-4 py-2">
            {user.isEditing ? (
              <input
                className="border rounded px-2 py-1"
                value={user.email}
                onChange={(e) => {
                  setUsers((prevUsers) => {
                    return prevUsers.map((prevUser) => {
                      if (prevUser.id === user.id) {
                        return { ...prevUser, email: e.target.value };
                      }
                      return prevUser;
                    });
                  });
                }}
              />
            ) : (
              user.email
            )}
          </td>
          <td className="border px-4 py-2">
            {user.isEditing ? (
              <input
                className="border rounded px-2 py-1"
                value={user.phoneNumber}
                onChange={(e) => {
                  setUsers((prevUsers) => {
                    return prevUsers.map((prevUser) => {
                      if (prevUser.id === user.id) {
                        return { ...prevUser, phoneNumber: e.target.value };
                      }
                      return prevUser;
                    });
                  });
                }}
              />
            ) : (
              user.phoneNumber
            )}
          </td>
          <td className="border px-4 py-2">
            {user.isEditing ? (
              <input
                className="border rounded px-2 py-1"
                value={user.idNumber}
                onChange={(e) => {
                  setUsers((prevUsers) => {
                    return prevUsers.map((prevUser) => {
                      if (prevUser.id === user.id) {
                        return { ...prevUser, idNumber: e.target.value };
                      }
                      return prevUser;
                    });
                  });
                }}
              />
            ) : (
              user.idNumber
            )}
          </td>
          <td className="border px-4 py-2">
            {user.isEditing ? (
              <input
                className="border rounded px-2 py-1"
                value={user.kraPin}
                onChange={(e) => {
                  setUsers((prevUsers) => {
                    return prevUsers.map((prevUser) => {
                      if (prevUser.id === user.id) {
                        return { ...prevUser, kraPin: e.target.value };
                      }
                      return prevUser;
                    });
                  });
                }}
              />
            ) : (
              user.kraPin
            )}
          </td>
          <td className="border px-4 py-2">
            {user.isEditing ? (
              <input
                className="border rounded px-2 py-1"
                value={user.DOB}
                onChange={(e) => {
                  setUsers((prevUsers) => {
                    return prevUsers.map((prevUser) => {
                      if (prevUser.id === user.id) {
                        return { ...prevUser, DOB: e.target.value };
                      }
                      return prevUser;
                    });
                  });
                }}
              />
            ) : (
              user.DOB
            )}
          </td>
          <td className="border px-4 py-2">
            {user.isEditing ? (
              <input
                className="border rounded px-2 py-1"
                value={user.Gender}
                onChange={(e) => {
                  setUsers((prevUsers) => {
                    return prevUsers.map((prevUser) => {
                      if (prevUser.id === user.id) {
                        return { ...prevUser, Gender: e.target.value };
                      }
                      return prevUser;
                    });
                  });
                }}
              />
            ) : (
              user.Gender
            )}
          </td>
          <td className="border px-4 py-2">
            {user.isEditing ? (
              <input
                className="border rounded px-2 py-1"
                value={user.Status}
                onChange={(e) => {
                  setUsers((prevUsers) => {
                    return prevUsers.map((prevUser) => {
                      if (prevUser.id === user.id) {
                        return { ...prevUser, Status: e.target.value };
                      }
                      return prevUser;
                    });
                  });
                }}
              />
            ) : (
              user.Status
            )}
          </td>
          <td className="border px-4 py-2">
            {user.isEditing ? (
              <input
                className="border rounded px-2 py-1"
                value={user.Address}
                onChange={(e) => {
                  setUsers((prevUsers) => {
                    return prevUsers.map((prevUser) => {
                      if (prevUser.id === user.id) {
                        return { ...prevUser, Address: e.target.value };
                      }
                      return prevUser;
                    });
                  });
                }}
              />
            ) : (
              user.Address
            )}
          </td>
          <td className="border px-4 py-2">
            {user.isEditing ? (
              <>
                <div className="flex">
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2 flex-1"
                    onClick={() => handleSave(user.id)}
                  >
                    Save
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex-1"
                    onClick={() => handleCancel(user.id)}
                  >
                    Cancel
                  </button>
                </div>
              </>            
            ) : (
              <>
                <div className="flex">
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2 w-24"
                    onClick={() => handleEdit(user.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-24"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </td>
        </tr>
      ))}
    </tbody>
    </table>
    </>
  );
};

export default ManageUsers;
