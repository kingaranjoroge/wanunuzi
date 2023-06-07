import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
function NavRight() {

    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove the token from local storage
        localStorage.removeItem('token');

        // Redirect to the login page
        navigate("/login");
    }
    return (
        <div className="navbar bg-green-700 justify-center w-[100px] h-full">
        </div>
    );
}

export default NavRight;
