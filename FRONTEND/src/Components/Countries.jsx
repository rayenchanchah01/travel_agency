import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { StarIcon, MapPinIcon, BuildingOfficeIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

function Countries() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hotelsLoading, setHotelsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCountries();
  }, []);

  // Fetch all countries
  const fetchCountries = () => {
    setLoading(true);
    setError(null);

    axios
      .get('http://localhost:5000/api/countries')
      .then((res) => {
        console.log('Countries response:', res.data);
        setCountries(res.data?.countries ?? res.data ?? [])
      })
      .catch((err) => {
        console.error('Error fetching countries:', err);
        if (err.response) {
          setError(err.response.data.message || 'Server error while fetching countries');
        } else if (err.request) {
          setError('No response from server while fetching countries');
        } else {
          setError(err.message);
        }
      })
      .finally(() => setLoading(false));
  };

  // Fetch hotels and filter by country name
  const fetchHotelsByCountry = (countryName) => {
    setHotelsLoading(true);
    setHotels([]);

    axios
      .get('http://localhost:5000/api/hotels', {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => {
        console.log('Hotels response:', res.data);
        const allHotels = res.data.hotels || res.data || [];
        const filteredHotels = allHotels.filter(
          (hotel) =>
            hotel.country && hotel.country.toLowerCase() === countryName.toLowerCase()
        );
        setHotels(filteredHotels);
      })
      .catch((err) => {
        console.error('Error fetching hotels:', err);
        setHotels([]);
      })
      .finally(() => setHotelsLoading(false));
  };

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
    fetchHotelsByCountry(country.name);
  };

  const handleBackToCountries = () => {
    setSelectedCountry(null);
    setHotels([]);
  };

  const handleBookHotel = (hotel) => {
    navigate(`/hotel/${hotel._id}`, { state: { hotel } });
  };

  // Loading state
  if (loading) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-32 pb-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-xl text-white">Loading countries...</p>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-32 pb-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-400 mb-4">Error: {error}</p>
          <button
            onClick={() => fetchCountries()}
            className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {!selectedCountry ? (
            // Countries View
            <motion.div
              key="countries-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Explore Countries</h1>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                  Select a country to discover amazing hotels and accommodations
                </p>
              </motion.div>

              {/* Countries Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.isArray(countries) && countries.length > 0 ? (
                  countries.map((country, index) => (
                    <motion.div
                      key={country._id || country.id || index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleCountryClick(country)}
                      className="cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:border-blue-500/30"
                    >
                      {country.image && (
                        <img
                          src={country.image}
                          alt={country.name}
                          className="w-full h-48 object-cover rounded-xl mb-4 border border-white/10"
                        />
                      )}
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                          <MapPinIcon className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{country.name}</h3>
                          {country.isoCode && (
                            <p className="text-sm text-gray-400">Code: {country.isoCode}</p>
                          )}
                        </div>
                      </div>
                      <div className="mt-4">
                        <span className="inline-flex items-center gap-1 text-blue-400 text-sm font-medium">
                          Click to view hotels →
                        </span>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-gray-400 text-center col-span-full py-12">
                    No countries available
                  </p>
                )}
              </div>
            </motion.div>
          ) : (
            // Hotels View
            <motion.div
              key="hotels-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Back Button and Header */}
              <div className="flex items-center justify-between">
                <button
                  onClick={handleBackToCountries}
                  className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors group"
                >
                  <ChevronLeftIcon className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                  <span className="font-medium">Back to Countries</span>
                </button>
                
                <div className="flex items-center gap-4">
                  {selectedCountry.image && (
                    <img
                      src={selectedCountry.image}
                      alt={selectedCountry.name}
                      className="w-12 h-8 object-cover rounded border border-white/10"
                    />
                  )}
                  <div className="text-right">
                    <h1 className="text-3xl font-bold text-white">Hotels in {selectedCountry.name}</h1>
                    <p className="text-gray-400">Discover amazing accommodations</p>
                  </div>
                </div>
              </div>

              {/* Hotels Grid */}
              <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
                {hotelsLoading ? (
                  <div className="text-center py-16">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-400 text-lg">Loading hotels...</p>
                  </div>
                ) : hotels.length === 0 ? (
                  <div className="text-center py-16">
                    <BuildingOfficeIcon className="w-20 h-20 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">No Hotels Found</h3>
                    <p className="text-gray-400 mb-6">
                      No hotels are currently available in {selectedCountry.name}
                    </p>
                    <button
                      onClick={handleBackToCountries}
                      className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                    >
                      Back to Countries
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h2 className="text-2xl font-bold text-white mb-2">
                          {hotels.length} Hotel{hotels.length !== 1 ? 's' : ''} Available
                        </h2>
                        <p className="text-gray-400">
                          Book your perfect stay in {selectedCountry.name}
                        </p>
                      </div>
                      <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
                        <MapPinIcon className="w-5 h-5" />
                        <span>{selectedCountry.name}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                      {hotels.map((hotel, index) => (
                        <motion.div
                          key={hotel._id || hotel.id || index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-all duration-300 hover:border-blue-500/30 group"
                        >
                          {/* Hotel Image */}
                          {hotel.photos && hotel.photos[0] && (
                            <div className="relative mb-4 overflow-hidden rounded-xl">
                              <img
                                src={hotel.photos[0]}
                                alt={hotel.name}
                                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full">
                                <div className="flex items-center gap-1">
                                  <StarIcon className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                  <span className="text-white font-semibold text-sm">{hotel.stars}</span>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Hotel Info */}
                          <div className="mb-4">
                            <h3 className="text-xl font-bold text-white mb-2">{hotel.name}</h3>
                            {hotel.description && (
                              <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                                {hotel.description}
                              </p>
                            )}
                            {hotel.city && (
                              <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                                <MapPinIcon className="w-4 h-4" />
                                <span>{hotel.city}, {selectedCountry.name}</span>
                              </div>
                            )}
                          </div>

                          {/* Amenities */}
                          {hotel.amenities && hotel.amenities.length > 0 && (
                            <div className="mb-4">
                              <p className="text-sm text-gray-400 mb-2">Key Amenities:</p>
                              <div className="flex flex-wrap gap-2">
                                {hotel.amenities.slice(0, 4).map((amenity, idx) => (
                                  <span
                                    key={idx}
                                    className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium"
                                  >
                                    {amenity}
                                  </span>
                                ))}
                                {hotel.amenities.length > 4 && (
                                  <span className="px-3 py-1 bg-gray-500/20 text-gray-300 rounded-full text-xs font-medium">
                                    +{hotel.amenities.length - 4} more
                                  </span>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Price and Book Button */}
                          <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/10">
                            <div>
                              <p className="text-2xl font-bold text-emerald-400">
                                ${hotel.pricePerNight}
                                <span className="text-sm font-normal text-gray-400"> / night</span>
                              </p>
                              {hotel.price && (
                                <p className="text-xs text-gray-400">
                                  Total: ${hotel.price} for your stay
                                </p>
                              )}
                            </div>
                            <button
                              onClick={() => handleBookHotel(hotel)}
                              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 hover:scale-105"
                            >
                              Book Now
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default Countries;