 import React from 'react';
import 'tailwindcss/tailwind.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import SignIn from './components/auth/SignIn.jsx';
import SignUp from './components/auth/SignUp.jsx';
import Homepage from './components/home/Homepage.jsx';
import Payment from './components/payments/Payment.jsx';
import Loan from "./components/loans/Loan.jsx";
import Savings from './components/savings/Savings.jsx';
import VerificationSuccess from './components/auth/VerificationSuccess.jsx';
import VerificationFailure from './components/auth/VerificationFailure.jsx';
import VerifyGuarantor from "./components/guarantors/VerifyGuarantor.jsx";
import Profile from "./components/user/Profile.jsx";
import About from "./components/about/About.jsx";
import ManageLoans from "./components/loans/ManageLoans.jsx";
import SavingsDashboard from "./components/savings/SavingsDashboard"
import CompleteSignUp from './components/auth/CompleteSignUp.jsx';
import NextOfKinProfile from './components/user/NextOfKinProfile.jsx';
import ManageUsers from './components/admin/ManageUsers.jsx';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const expirationTime = localStorage.getItem("expirationTime");

  if (token && Date.now() <= expirationTime) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

const isAdministrator = () => {
    //
    return false;
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />} >
                <Route index element={<SignIn />} />
                <Route path="/manage-loans" element={<ManageLoans />} />
                <Route path="/about" element={<About />} />
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
                <Route path="savings-dashboard" element={<SavingsDashboard />} />
                <Route path="complete-registration" element={<CompleteSignUp />} />
                <Route path="profile/nextOfKin" element={<NextOfKinProfile />} />
                <Route path="manage-users" element={<ManageUsers />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Route>
        </Routes>
    );
}

export default App;
