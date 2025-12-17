import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronDownIcon, StarIcon } from '@heroicons/react/24/outline';
import Background2 from '../Assets/Background2.jpg';

/**
 * Home Component (Hero Section)
 * Main landing section with background image
 */
function Home() {
  const sectionRef = useRef(null);
  const isVisible = useInView(sectionRef, { once: true, amount: 0.3 });

  // Simple scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full -z-10">
        <img
          src={Background2}
          alt="Travel Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/20">
          <StarIcon className="w-5 h-5 text-yellow-400" />
          <span className="text-white text-sm font-semibold">Your Dream Journey Awaits</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
          Explore the{' '}
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            World
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl md:text-3xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
          Discover breathtaking destinations and create unforgettable memories with our
          personalized travel experiences
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => scrollToSection('recommendations')}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-4 px-8 rounded-full text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 w-full sm:w-auto"
          >
            Explore Recommendations
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="bg-white/10 backdrop-blur-md text-white font-bold py-4 px-8 rounded-full text-lg border-2 border-white/30 hover:bg-white/20 transition-all duration-300 w-full sm:w-auto"
          >
            Learn More
          </button>
        </div>
      </motion.div>

      {/* Scroll Indicator - Outside content div, positioned at bottom of section */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30">
        <motion.button
          onClick={() => scrollToSection('about')}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 transition-colors duration-300"
        >
          <span className="text-sm font-bold text-white drop-shadow-lg">Scroll Down</span>
          <ChevronDownIcon className="w-6 h-6 text-white drop-shadow-lg" />
        </motion.button>
      </div>
    </section>
  );
}

export default Home;
