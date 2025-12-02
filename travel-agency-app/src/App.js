import React from 'react';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import Recommendations from './Components/Recommendations';
import Contact from './Components/Contact';

/**
 * Main App Component
 * Simple landing page with basic sections
 */
function App() {
  return (
    <div className="relative">
      <Navbar />
      <Home />
      <About />
      <Recommendations />
      <Contact />
    </div>
  );
}

export default App;
