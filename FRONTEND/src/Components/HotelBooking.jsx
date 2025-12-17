import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  CalendarIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  StarIcon,
  CheckCircleIcon,
  CreditCardIcon,
} from '@heroicons/react/24/outline';

function HotelBooking() {
  const location = useLocation();
  const navigate = useNavigate();
  const hotel = location.state?.hotel;

  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [numberOfPersons, setNumberOfPersons] = useState(1);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Redirect if no hotel data
  if (!hotel) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-32 pb-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-white mb-4">No hotel selected</p>
          <button
            onClick={() => navigate('/countries')}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
          >
            Browse Hotels
          </button>
        </div>
      </section>
    );
  }

  // Calculate number of nights
  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const diffTime = Math.abs(checkOut - checkIn);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    const nights = calculateNights();
    return hotel.pricePerNight * nights * numberOfPersons;
  };

  const nights = calculateNights();
  const totalPrice = calculateTotalPrice();

  const handlePayment = async (e) => {
    e.preventDefault();
    
    if (!checkInDate || !checkOutDate) {
      alert('Please select check-in and check-out dates');
      return;
    }

    if (nights <= 0) {
      alert('Check-out date must be after check-in date');
      return;
    }

    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setPaymentSuccess(true);
    }, 2000);
  };

  if (paymentSuccess) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-32 pb-20 px-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full rounded-3xl border border-green-500/30 bg-green-500/10 backdrop-blur-xl p-8 text-center"
        >
          <CheckCircleIcon className="w-20 h-20 text-green-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">Payment Successful!</h2>
          <p className="text-gray-300 mb-6">
            Your booking at {hotel.name} has been confirmed.
          </p>
          <div className="bg-white/5 rounded-xl p-4 mb-6 text-left">
            <p className="text-sm text-gray-400 mb-1">Booking Details:</p>
            <p className="text-white">Check-in: {checkInDate}</p>
            <p className="text-white">Check-out: {checkOutDate}</p>
            <p className="text-white">Guests: {numberOfPersons}</p>
            <p className="text-white">Nights: {nights}</p>
            <p className="text-2xl font-bold text-emerald-400 mt-2">Total: ${totalPrice}</p>
          </div>
          <button
            onClick={() => navigate('/countries')}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
          >
            Browse More Hotels
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Complete Your Booking
          </h1>
          <p className="text-gray-400 text-lg">
            Review your booking details and complete payment
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Invoice */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <BuildingOfficeIcon className="w-8 h-8 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">Invoice</h2>
            </div>

            {/* Hotel Info */}
            <div className="mb-6">
              {hotel.photos && hotel.photos[0] && (
                <img
                  src={hotel.photos[0]}
                  alt={hotel.name}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
              )}
              <h3 className="text-2xl font-bold text-white mb-2">{hotel.name}</h3>

              <div className="flex items-center gap-2 mb-2">
                <StarIcon className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="text-white font-semibold">{hotel.stars} Stars</span>
              </div>

              {hotel.city && (
                <p className="text-gray-400">{hotel.city}{hotel.country && `, ${hotel.country}`}</p>
              )}

              {hotel.description && (
                <p className="text-gray-300 mt-3 text-sm">{hotel.description}</p>
              )}
            </div>

            {/* Booking Summary */}
            <div className="border-t border-white/10 pt-6">
              <h4 className="text-lg font-bold text-white mb-4">Booking Summary</h4>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Price per night:</span>
                  <span className="font-semibold text-white">${hotel.pricePerNight}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Number of nights:</span>
                  <span className="font-semibold text-white">{nights || 0}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Number of persons:</span>
                  <span className="font-semibold text-white">{numberOfPersons}</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-white">Total Price:</span>
                  <span className="text-3xl font-bold text-emerald-400">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Payment Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <CreditCardIcon className="w-8 h-8 text-purple-400" />
              <h2 className="text-2xl font-bold text-white">Payment Details</h2>
            </div>

            <form onSubmit={handlePayment} className="space-y-6">
              {/* Check-in Date */}
              <div>
                <label className="flex items-center gap-2 text-white font-semibold mb-2">
                  <CalendarIcon className="w-5 h-5 text-blue-400" />
                  Check-in Date
                </label>
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Check-out Date */}
              <div>
                <label className="flex items-center gap-2 text-white font-semibold mb-2">
                  <CalendarIcon className="w-5 h-5 text-blue-400" />
                  Check-out Date
                </label>
                <input
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  min={checkInDate || new Date().toISOString().split('T')[0]}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Number of Persons */}
              <div>
                <label className="flex items-center gap-2 text-white font-semibold mb-2">
                  <UserGroupIcon className="w-5 h-5 text-purple-400" />
                  Number of Persons (Max: 4)
                </label>
                <input
                  type="number"
                  value={numberOfPersons}
                  onChange={(e) => setNumberOfPersons(Math.min(4, Math.max(1, parseInt(e.target.value) || 1)))}
                  min="1"
                  max="4"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              {/* Payment Button */}
              <button
                type="submit"
                disabled={loading || !checkInDate || !checkOutDate}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-4 rounded-lg font-bold text-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCardIcon className="w-6 h-6" />
                    Pay Now ${totalPrice.toFixed(2)}
                  </>
                )}
              </button>

              <p className="text-center text-sm text-gray-400">
                This is a simulated payment. No actual charges will be made.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HotelBooking;

