import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';
import Homepage from './Homepage.jsx';
import jwtDecode from 'jwt-decode';

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
        <Router>
            <Routes>
                <Route path="/login" element={<SignIn />} />
                <Route path="/register" element={<SignUp />} />
                <Route path="/home" element={<ProtectedRoute><Homepage /></ProtectedRoute>} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;
