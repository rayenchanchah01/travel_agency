import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import Recommendations from './Components/Recommendations';
import Contact from './Components/Contact';
import TravelCatalog from './Components/TravelCatalog';
import AdminDashboard from './Components/AdminDashboard';
import Countries from './Components/Countries';
import HotelBooking from './Components/HotelBooking';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';

function HomePage() {
  return (
    <>
      <Home />
      <About />
      <Recommendations />
      <Contact />
    </>
  );
}

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Home */}
        <Route path="/" element={<HomePage />} />

        {/* Public pages */}
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/countries" element={<Countries />} />

        {/* Travel */}
        <Route path="/catalog" element={<TravelCatalog />} />
        <Route path="/catalog/:view" element={<TravelCatalog />} />
        <Route path="/hotel/:id" element={<HotelBooking />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Auth */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Fallback */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
