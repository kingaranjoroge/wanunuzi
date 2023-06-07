import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
function NavBar() {

    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove the token from local storage
        localStorage.removeItem('token');

        // Redirect to the login page
        navigate("/login");
    }
    return (
        <div className="navbar bg-green-700 justify-center">
            <div className="navbar-start">
            </div>
            <div className="navbar-center">
                <div className="text-3xl font-bold">Wanunuzi sacco</div>
            </div>
            <div className="navbar-end">
                <button className="btn btn-ghost btn-circle text-2xl">
                    <i className="fa-solid fa-circle-user"></i>
                </button>
                <button className="btn btn-ghost btn-circle">
                    <div className="indicator text-2xl">
                        <i className="fa-solid fa-bell"></i>
                        <span className="badge badge-xs badge-primary indicator-item"></span>
                    </div>
                </button>
                <button className="btn btn-ghost btn-circle text-2xl" onClick={handleLogout}>
                    <i className="fa-solid fa-right-from-bracket"></i>
                </button>
            </div>
        </div>
    );
}

export default NavBar;
