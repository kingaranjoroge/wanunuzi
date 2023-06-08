import React from 'react';
import Layout from './Layout.jsx';
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';
import Homepage from './Homepage.jsx';
<<<<<<< HEAD
import Payment from './Payment.jsx';
import NavBar from './NavBar.jsx';
import NavBeforeLogin from './NavBarUnlogged.jsx';
import { Routes, Route, Navigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
=======
import jwtDecode from 'jwt-decode';
>>>>>>> ba6c0eacb6eb40faeb697770286b849fac4382cb

const ProtectedRoute = ({children}) => {
    const token = localStorage.getItem('token');
    const expirationTime = localStorage.getItem('expirationTime');

    if (token && Date.now() <= expirationTime) {
        return children;
    } else {
        return <Navigate to="/login" />;
    }
}


function App() {
    return (
<<<<<<< HEAD
        <Routes>
            <Route path="/" element={<Layout />} >
                <Route path="/register" element={<SignUp />} />                    
                <Route path="/payment" element={<Payment />} />
                <Route path="/login" element={<SignIn />} />            
=======
        <Router>
            <Routes>
                <Route path="/login" element={<SignIn />} />
                <Route path="/register" element={<SignUp />} />
>>>>>>> ba6c0eacb6eb40faeb697770286b849fac4382cb
                <Route path="/home" element={<ProtectedRoute><Homepage /></ProtectedRoute>} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Route>
        </Routes>
    );
}

export default App;
