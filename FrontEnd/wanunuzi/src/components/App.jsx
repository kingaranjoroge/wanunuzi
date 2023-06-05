import React from 'react';
import {BrowserRouter, BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SignUp from "./SignUp.jsx";
import SignIn from "./SignIn.jsx";
import NavBar from "./NavBar.jsx";
import Homepage from "./Homepage.jsx";

function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>

                <Route path="/login" element={<SignIn />}>
                </Route>
                <Route path="/" element={<SignIn />}>
                </Route>
                <Route path="/register" element={<SignUp />}>
                </Route>
                <Route path="/home" element={<Homepage />}>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
