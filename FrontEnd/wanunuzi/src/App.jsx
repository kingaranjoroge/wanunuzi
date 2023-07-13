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
import NotAdmin from "./components/admin/NotAdmin.jsx";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const expirationTime = localStorage.getItem("expirationTime");

  if (token && Date.now() <= expirationTime) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

 const isAdmin = async () => {
     const token = localStorage.getItem('token');
     if (token) {
         const response = await fetch('http://localhost:3000/admin/isAdmin', {
             method: 'GET',
             headers: {
                 'Content-Type': 'application/json',
                 'x-auth-token': token,
             },
         });

         console.log("Response: ", response); // Add this line

         const data2 = await response.json();
         console.log('data', data2);
         return data2.isAdmin; // This depends on the response shape of your endpoint
     }

     return false;
 };


 // Create a new protected route for admin paths
 const ProtectedAdminRoute = ({ children }) => {
     const [admin, setAdmin] = React.useState(null);

     React.useEffect(() => {
         isAdmin().then(res => setAdmin(res));
     }, []);

     if (admin === null) {
         return <p>Loading...</p>; // Replace this with your loading component
     } else if (admin) {
         return children;
     } else {
         return <Navigate to="/not-admin" />;
     }
 };

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
                <Route path="/manage-users" element={<ProtectedAdminRoute><ManageUsers /></ProtectedAdminRoute>} />
                <Route path="*" element={<Navigate to="/login" />} />
                <Route path="not-admin" element={<NotAdmin />} />
            </Route>
        </Routes>
    );
}

export default App;