import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout.jsx';
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';
import Homepage from './Homepage.jsx';
import Payment from './Payment.jsx';
import 'tailwindcss/tailwind.css';
import Loan from "./Loan.jsx";
import Savings from './Savings.jsx';
import VerificationSuccess from './auth/VerificationSuccess.jsx';
import VerificationFailure from './auth/VerificationFailure.jsx';
import VerifyGuarantor from "./guarantors/VerifyGuarantor.jsx";
import Savings from "./Savings.jsx";
import Profile from "./Profile.jsx";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const expirationTime = localStorage.getItem("expirationTime");

  if (token && Date.now() <= expirationTime) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />} >
                <Route index element={<SignIn />} />
                <Route path="/verify-guarantor" element={<VerifyGuarantor />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/register" element={<SignUp />} />
                <Route path="/home" element={<ProtectedRoute><Homepage /></ProtectedRoute>} />
                <Route path="/loan" element={<ProtectedRoute><Loan /></ProtectedRoute>} />
                <Route path="/savings" element={<Savings/>} />

                <Route path="/verification-success" element={<VerificationSuccess />} />
                <Route path="/verification-failure" element={<VerificationFailure />} />

                <Route path="profile" element={<Profile />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Route>
        </Routes>
    );
}

export default App;
