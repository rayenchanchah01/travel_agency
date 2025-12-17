import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  StarIcon,
  GlobeAltIcon,
  BuildingOfficeIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';
import { hotelService, flightService, countryService, cityService } from '../api';

function TravelCatalog() {
  const { view } = useParams();
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [flights, setFlights] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(view || 'all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [hotelsRes, flightsRes, countriesRes, citiesRes] = await Promise.all([
          hotelService.getAll(),
          flightService.getAll(),
          countryService.getAll(),
          cityService.getAll(),
        ]);
        setHotels(hotelsRes.data.hotels || hotelsRes.data || []);
        setFlights(flightsRes.data || []);
        setCountries(countriesRes.data || []);
        setCities(citiesRes.data || []);
      } catch (err) {
        setError(err.message || 'Failed to fetch data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-xl">Loading travel catalog...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-400 mb-4">Error: {error}</p>
          <button
            onClick={() => navigate('/')}
            className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
          >
            Go Back
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-950 text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-blue-300">Database Collection</p>
            <h1 className="text-4xl sm:text-5xl font-bold mt-3">Travel Catalog</h1>
            <p className="text-gray-400 mt-4 max-w-2xl">
              Browse our collection of hotels, flights, countries, and cities from the database.
            </p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="self-start rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
          >
            Back to Home
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {['all', 'hotels', 'flights', 'countries', 'cities'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {(activeTab === 'all' || activeTab === 'hotels') && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500">
                <BuildingOfficeIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Hotels ({hotels.length})</h3>
                <p className="text-sm text-gray-300">Available accommodations</p>
              </div>
            </div>

            {hotels.length === 0 ? (
              <p className="text-gray-400">No hotels found in the database.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {hotels.map((hotel) => (
                  <div key={hotel._id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-lg font-semibold">{hotel.name}</p>
                      <div className="flex items-center gap-1 text-yellow-300">
                        <StarIcon className="w-4 h-4" />
                        <span className="text-sm">{hotel.stars}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">{hotel.city}</p>
                    <p className="mt-3 text-xl font-bold text-emerald-300">${hotel.pricePerNight}/night</p>
                    {hotel.reviews && hotel.reviews.length > 0 && (
                      <p className="text-sm text-gray-400 mt-2">
                        {hotel.reviews.length} review(s) • Avg: {getAverageRating(hotel.reviews)}/10
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {(activeTab === 'all' || activeTab === 'flights') && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500">
                <PaperAirplaneIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Flights ({flights.length})</h3>
                <p className="text-sm text-gray-300">Available flights</p>
              </div>
            </div>

            {flights.length === 0 ? (
              <p className="text-gray-400">No flights found in the database.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {flights.map((flight) => (
                  <div key={flight._id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <p className="text-lg font-semibold">{flight.flightNumber}</p>
                    <p className="text-sm text-gray-400">{flight.airline}</p>
                    <p className="mt-2 text-white">
                      {flight.origin?.city} ({flight.origin?.code}) → {flight.destination?.city} ({flight.destination?.code})
                    </p>
                    <p className="text-sm text-gray-400">{flight.duration}</p>
                    <p className="mt-3 text-xl font-bold text-emerald-300">
                      From ${flight.price?.economy}
                    </p>
                    <span className={`inline-block mt-2 px-2 py-1 rounded text-xs ${
                      flight.status === 'scheduled' ? 'bg-green-500/20 text-green-300' :
                      flight.status === 'delayed' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-red-500/20 text-red-300'
                    }`}>
                      {flight.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {(activeTab === 'all' || activeTab === 'countries') && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500">
                <GlobeAltIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Countries ({countries.length})</h3>
                <p className="text-sm text-gray-300">Destinations available</p>
              </div>
            </div>

            {countries.length === 0 ? (
              <p className="text-gray-400">No countries found in the database.</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {countries.map((country) => (
                  <div key={country._id} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                    {country.image && (
                      <img src={country.image} alt={country.name} className="w-full h-24 object-cover rounded-xl mb-3" />
                    )}
                    <p className="font-semibold">{country.name}</p>
                    {country.isoCode && <p className="text-sm text-gray-400">{country.isoCode}</p>}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {(activeTab === 'all' || activeTab === 'cities') && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500">
                <BuildingOfficeIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Cities ({cities.length})</h3>
                <p className="text-sm text-gray-300">Cities to explore</p>
              </div>
            </div>

            {cities.length === 0 ? (
              <p className="text-gray-400">No cities found in the database.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cities.map((city) => (
                  <div key={city._id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    {city.image && (
                      <img src={city.image} alt={city.name} className="w-full h-32 object-cover rounded-xl mb-3" />
                    )}
                    <p className="text-lg font-semibold">{city.name}</p>
                    <p className="text-sm text-gray-400">{city.country}</p>
                    {city.description && (
                      <p className="text-sm text-gray-300 mt-2 line-clamp-2">{city.description}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default TravelCatalog;
