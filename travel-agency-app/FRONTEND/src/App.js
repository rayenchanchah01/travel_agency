import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import Recommendations from './Components/Recommendations';
import Contact from './Components/Contact';
import TravelCatalog from './Components/TravelCatalog';

/**
 * Main App Component
 * Simple landing page with basic sections
 */
function App() {
  const [showCatalog, setShowCatalog] = useState(false);
  const [catalogView, setCatalogView] = useState('all');

  const openCatalog = (view = 'all') => {
    setCatalogView(view);
    setShowCatalog(true);
    window.scrollTo(0, 0);
  };

  const closeCatalog = () => {
    setShowCatalog(false);
  };

  if (showCatalog) {
    return (
      <div className="relative">
        <Navbar />
        <TravelCatalog onBack={closeCatalog} initialView={catalogView} />
      </div>
    );
  }

  return (
    <div className="relative">
      <Navbar />
      <Home />
      <About />
      <Recommendations onOpenCatalog={openCatalog} />
      <Contact />
    </div>
  );
}

export default App;
