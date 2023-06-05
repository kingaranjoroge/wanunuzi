import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/register">Sign Up</Link>
                </li>
                <li>
                    <Link to="/login">Log In</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
