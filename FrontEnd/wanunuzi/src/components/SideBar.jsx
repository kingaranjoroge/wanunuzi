import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NavRight() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');

    // Redirect to the login page
    navigate('/login');
  };

  return (
    <div className="navbar fixed left-0 bg-green-700 w-[70px] h-screen flex flex-col text-black">
      <a className="flex flex-col items-center my-3">
        <i className="fa-solid btn btn-circle ring-green-800 text-2xl ring-2 ring-inset bg-green-700 fa-building-columns"></i>
        <p className="text-xs">Deposit</p>
      </a>
      <a className="flex flex-col items-center my-3">
        <i className="fa-solid btn btn-circle ring-green-800  text-2xl ring-2 ring-black-500 ring-inset bg-green-700 fa-money-check-dollar"></i>
        <p className="text-xs">Withdraw</p>
      </a>
      <a className="flex flex-col items-center my-3">
        <i className="fa-solid btn btn-circle ring-green-800  text-2xl ring-2 ring-inset bg-green-700 fa-circle-info"></i>
        <p className="text-xs">About</p>
      </a>
    </div>
  );
}

export default NavRight;
