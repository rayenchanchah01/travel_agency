import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { StarIcon, MapPinIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';
import { countryService, hotelService } from '../api/services';

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

  const fetchCountries = async () => {
    try {
      setLoading(true);
      const res = await countryService.getAll();
      setCountries(res.data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch countries');
    } finally {
      setLoading(false);
    }
  };

  const fetchHotelsByCountry = async (countryName) => {
    try {
      setHotelsLoading(true);
      const res = await hotelService.getAll();
      const allHotels = res.data.hotels || res.data || [];
      // Filter hotels by country
      const filteredHotels = allHotels.filter(
        hotel => hotel.country && hotel.country.toLowerCase() === countryName.toLowerCase()
      );
      setHotels(filteredHotels);
    } catch (err) {
      console.error('Error fetching hotels:', err);
      setHotels([]);
    } finally {
      setHotelsLoading(false);
    }
  };

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
    fetchHotelsByCountry(country.name);
  };

  const handleBookHotel = (hotel) => {
    navigate(`/hotel/${hotel._id}`, { state: { hotel } });
  };

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

  if (error) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-32 pb-20 px-4 flex items-center justify-center">
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
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Explore Countries
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Select a country to discover amazing hotels and accommodations
          </p>
        </motion.div>

        {/* Countries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {countries.map((country, index) => (
            <motion.div
              key={country._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleCountryClick(country)}
              className={`cursor-pointer rounded-2xl border transition-all duration-300 p-6 ${
                selectedCountry?._id === country._id
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-white/10 bg-white/5 hover:bg-white/10'
              }`}
            >
              {country.image && (
                <img
                  src={country.image}
                  alt={country.name}
                  className="w-full h-40 object-cover rounded-xl mb-4"
                />
              )}
              <div className="flex items-center gap-2 mb-2">
                <MapPinIcon className="w-5 h-5 text-blue-400" />
                <h3 className="text-xl font-bold text-white">{country.name}</h3>
              </div>
              {country.isoCode && (
                <p className="text-sm text-gray-400">{country.isoCode}</p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Hotels Section */}
        {selectedCountry && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <BuildingOfficeIcon className="w-8 h-8 text-purple-400" />
              <div>
                <h2 className="text-3xl font-bold text-white">
                  Hotels in {selectedCountry.name}
                </h2>
                <p className="text-gray-400">
                  {hotelsLoading ? 'Loading...' : `${hotels.length} hotel(s) available`}
                </p>
              </div>
            </div>

            {hotelsLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
              </div>
            ) : hotels.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">
                  No hotels found in {selectedCountry.name}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hotels.map((hotel) => (
                  <div
                    key={hotel._id}
                    className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-all duration-300"
                  >
                    {hotel.photos && hotel.photos[0] && (
                      <img
                        src={hotel.photos[0]}
                        alt={hotel.name}
                        className="w-full h-48 object-cover rounded-xl mb-4"
                      />
                    )}

                    <h3 className="text-xl font-bold text-white mb-2">{hotel.name}</h3>

                    {hotel.description && (
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                        {hotel.description}
                      </p>
                    )}

                    <div className="flex items-center gap-2 mb-3">
                      <StarIcon className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      <span className="text-white font-semibold">{hotel.stars} Stars</span>
                    </div>

                    {hotel.amenities && hotel.amenities.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-400 mb-2">Amenities:</p>
                        <div className="flex flex-wrap gap-2">
                          {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-xs"
                            >
                              {amenity}
                            </span>
                          ))}
                          {hotel.amenities.length > 3 && (
                            <span className="px-2 py-1 bg-gray-500/20 text-gray-300 rounded-lg text-xs">
                              +{hotel.amenities.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                      <div>
                        <p className="text-2xl font-bold text-emerald-400">
                          ${hotel.pricePerNight}
                        </p>
                        <p className="text-xs text-gray-400">per night</p>
                      </div>
                      <button
                        onClick={() => handleBookHotel(hotel)}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                      >
                        Book Now
                      </button>
                    </div>
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

export default Countries;

