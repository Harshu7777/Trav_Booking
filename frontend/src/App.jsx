import React from 'react';
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
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CreateContact from './pages/CreateContact'

// Initialize Stripe with your public key
const stripePromise = loadStripe('pk_test_51QQ4RNHU864JrHStp0fhIgq0SI6isIkHe8wLmh5ObV6Z957z12zU5v4ppMLaZ4KzIZdGAI84htnIlHdKDuPAIARl00LDYI5BRI');

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          {/* Standard routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/packages1" element={<PackageList1 />} />

          {/* Route to display the list of contacts */}
          {/* <Route path="/contacts" element={<ContactList />} /> */}

          {/* Route to display the contact form for creating a new contact */}
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
          </Route>

          {/* Admin Routes */}
          <Route element={<AdminRoute />}>
            <Route path="/packages" element={<CreatePackage />} />
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
