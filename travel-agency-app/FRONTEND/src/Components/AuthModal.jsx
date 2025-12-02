import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

/**
 * AuthModal Component
 * Modal popup for Sign In / Sign Up forms
 * - Shows different form based on 'type' prop ('signin' or 'signup')
 * - Has password visibility toggle
 */
function AuthModal({ type, onClose }) {
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  // Check if this is sign up mode
  const isSignUp = type === 'signup';

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add authentication logic here
    alert(isSignUp ? 'Account created successfully!' : 'Signed in successfully!');
    onClose();
  };

  return (
    <AnimatePresence>
      {type && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          onClick={onClose} // Close when clicking backdrop
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-2 text-gray-500 hover:bg-gray-100"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-500">
                {isSignUp ? 'Become a Member' : 'Welcome Back'}
              </p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">
                {isSignUp ? 'Create Account' : 'Sign In'}
              </h3>
              <p className="text-gray-500 mt-2">
                {isSignUp
                  ? 'Unlock exclusive journeys and tailored itineraries.'
                  : 'Access your trips, itineraries, and bookings.'}
              </p>
            </div>

            {/* Form */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Name field - only shown for sign up */}
              {isSignUp && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Alex Traveler"
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                  />
                </div>
              )}

              {/* Email field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                />
              </div>

              {/* Password field with visibility toggle */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors pr-12"
                  />
                  {/* Toggle password visibility button */}
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              {isSignUp ? (
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 py-3 text-lg font-semibold text-white shadow-lg shadow-blue-500/30"
                >
                  Create Account
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-2xl bg-gray-900 py-3 text-lg font-semibold text-white shadow-lg shadow-gray-900/30"
                >
                  Sign In
                </motion.button>
              )}
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AuthModal;
