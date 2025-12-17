import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import Recommendations from './Components/Recommendations';
import Contact from './Components/Contact';
import TravelCatalog from './Components/TravelCatalog';
import AdminDashboard from './Components/AdminDashboard';
import ProtectedRoute from './Components/ProtectedRoute';
import Countries from './Components/Countries';
import HotelBooking from './Components/HotelBooking';

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
    <AuthProvider>
      <Router>
        <div className="relative">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/countries" element={<Countries />} />
            <Route path="/hotel/:id" element={<HotelBooking />} />
            <Route path="/catalog" element={<TravelCatalog />} />
            <Route path="/catalog/:view" element={<TravelCatalog />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
