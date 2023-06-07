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
        <div className="navbar bg-green-700 justify-center w-[100px] h-full flex flex-col items-center text-black">
            <i className="text-2xl my-8">
                <i className="far fa-money-bill-transfer"></i>
            </i>
            <i className="text-2xl my-8">
                <i className="fas fa-money-bill-transfer"></i>
            </i>
            <i className="text-2xl my-8">
                <i className="fas fa-address-card"></i>
            </i>
        </div>


    );
}

export default NavRight;
