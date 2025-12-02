import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  GlobeAltIcon,
  HeartIcon,
  StarIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

/**
 * About Component
 * Simple about section with feature cards
 */
function About() {
  const sectionRef = useRef(null);
  const isVisible = useInView(sectionRef, { once: true, amount: 0.3 });

  // Feature cards data
  const features = [
    {
      icon: GlobeAltIcon,
      title: 'Worldwide Destinations',
      description: 'Explore over 100+ destinations across the globe with our curated travel packages.',
    },
    {
      icon: HeartIcon,
      title: 'Personalized Experiences',
      description: 'We craft unique journeys tailored to your preferences and travel style.',
    },
    {
      icon: StarIcon,
      title: 'Premium Quality',
      description: 'Experience luxury accommodations and top-tier service on every trip.',
    },
    {
      icon: UserGroupIcon,
      title: 'Expert Team',
      description: 'Our travel experts have years of experience creating unforgettable memories.',
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            About Us
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6" />
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We are a team of passionate travel enthusiasts dedicated to helping you explore the world.
            Our mission is to provide personalized travel experiences that create lasting memories.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default About;
