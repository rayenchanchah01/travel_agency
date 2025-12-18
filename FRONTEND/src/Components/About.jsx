import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  GlobeAltIcon,
  MapPinIcon,
  ShieldCheckIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

/**
 * About Component
 * Animated About section for Travel Agency
 */
function About() {
  const sectionRef = useRef(null);
  const isVisible = useInView(sectionRef, { once: true, amount: 0.3 });

  const features = [
    {
      icon: GlobeAltIcon,
      title: "Global Destinations",
      description:
        "Explore a wide range of destinations worldwide with carefully selected travel options.",
    },
    {
      icon: MapPinIcon,
      title: "Smart Planning",
      description:
        "Plan and manage your trips easily through our modern and intuitive platform.",
    },
    {
      icon: ShieldCheckIcon,
      title: "Secure Booking",
      description:
        "Your personal data and payments are protected with industry-standard security.",
    },
    {
      icon: UserGroupIcon,
      title: "Dedicated Support",
      description:
        "Our support team is available to assist you before, during, and after your journey.",
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-br from-white to-blue-50 py-20 px-4 sm:px-6 lg:px-8"
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
            We are a modern travel agency dedicated to creating seamless and
            unforgettable travel experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Who We Are
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              We provide a complete digital travel platform that allows users to
              explore destinations, book flights and hotels, and organize their
              journeys with confidence.
            </p>
            <p className="text-gray-600 leading-relaxed">
              By combining smart technology with trusted partners, we simplify
              travel planning while offering competitive prices and exceptional
              service.
            </p>
          </motion.div>

          {/* Right Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6"
                >
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl w-fit mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
