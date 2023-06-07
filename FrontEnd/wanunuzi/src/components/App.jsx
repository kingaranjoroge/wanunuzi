import React from 'react';
import {BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom';
import SignUp from "./SignUp.jsx";
import SignIn from "./SignIn.jsx";
import NavBar from "./NavBar.jsx";
import Homepage from "./Homepage.jsx";
import NavBeforeLogin from "./NavBarUnlogged.jsx";

function Content() {
    const location = useLocation();

    return (
        <div className="sans">
            {(location.pathname !== '/login' && location.pathname !== '/register') && <NavBar />}
            {(location.pathname === '/login' || location.pathname === '/register') && <NavBeforeLogin />}
            <Routes>
                <Route path="/login" element={<SignIn />} />
                <Route path="/" element={<SignIn />} />
                <Route path="/register" element={<SignUp />} />
                <Route path="/home" element={<Homepage />} />
            </Routes>
        </div>
    );
}

function App() {
    return (
        <Router>
            <Content />
        </Router>
    );
}

export default App;
