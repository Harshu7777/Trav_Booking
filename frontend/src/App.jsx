import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PackageList from './pages/PackageList';
import PackageList1 from './pages/PackageList1';
import PackageDetails from './pages/PackageDetails';
import CreatePackage from './pages/CreatePackage';
import EditPackage from './pages/EditPackage';
import BookingList from './pages/BookingList';
import CreateBooking from './pages/CreateBooking';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Dashboard from './pages/DashBoard';
import PaymentCard from './pages/PaymentForm'; 
import CreateContact from './pages/CreateContact';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Logout from './pages/Logout';

// Initialize Stripe with your public key
const stripePromise = loadStripe('pk_test_51QQ4RNHU864JrHStp0fhIgq0SI6isIkHe8wLmh5ObV6Z957z12zU5v4ppMLaZ4KzIZdGAI84htnIlHdKDuPAIARl00LDYI5BRI');

const theme = createTheme();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      try {
        const userRole = JSON.parse(atob(token.split('.')[1])).role;
        setIsLoggedIn(true);
        setIsAdmin(userRole === 'admin');
      } catch (error) {
        console.error("Error decoding token:", error);
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/packages1" element={<PackageList1 />} />
          <Route path="/contacts" element={<CreateContact />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/packages" element={<PackageList />} />
            <Route path="/packages/:id" element={<PackageDetails />} />
            <Route path="/bookings" element={<BookingList />} />
            <Route
              path="/bookings/create"
              element={
                <Elements stripe={stripePromise}>
                  <CreateBooking />
                </Elements>
              }
            />
            <Route
              path="/payment"
              element={
                <Elements stripe={stripePromise}>
                  <PaymentCard />
                </Elements>
              }
            />
          </Route>

          {/* Admin Routes */}
          <Route element={<AdminRoute />}>
            <Route path="/packages/create" element={<CreatePackage />} />
            <Route path="/packages/:id/edit" element={<EditPackage />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
