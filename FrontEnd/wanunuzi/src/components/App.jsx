import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';
import Homepage from './Homepage.jsx';
import NavBar from './NavBar.jsx';
import NavBeforeLogin from './NavBarUnlogged.jsx';

const ProtectedRoute = ({children}) => {
    const token = localStorage.getItem('token');

    return token ? children : <Navigate to="/login" />;
}

function App() {
    return (
        <Router>
            {(location.pathname !== '/login' && location.pathname !== '/register') && <NavBar />}
            {(location.pathname === '/login' || location.pathname === '/register') && <NavBeforeLogin />}
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
