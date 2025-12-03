import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';
import CaliforniaImg from '../Assets/california.jpg';
import HongKongImg from '../Assets/hong kong.jpg';
import BrazilImg from '../Assets/Brazil.jpg';

function Recommendations() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const isVisible = useInView(sectionRef, { once: true, amount: 0.2 });

  const destinations = [
    {
      name: 'California Coast Escape',
      location: 'Big Sur & Napa Valley, USA',
      description: 'Sun-soaked drives, cliffside sunsets, and vineyard tastings.',
      image: CaliforniaImg,
      rating: 4.9,
      hotels: ['Post Ranch Inn • Big Sur', 'Auberge du Soleil • Napa', 'Hotel Californian • Santa Barbara'],
      activities: ['Private Highway 1 helicopter tour', 'Sommelier-led Napa tasting', 'Sunset sailing in Monterey Bay'],
      hotelLink: 'https://www.booking.com',
      flightLink: 'https://www.skyscanner.com',
    },
    {
      name: 'Vibrant Hong Kong Getaway',
      location: 'Hong Kong SAR, China',
      description: 'Skyline views, Michelin dining, and neon-lit night markets.',
      image: HongKongImg,
      rating: 4.8,
      hotels: ['The Upper House • Admiralty', 'Rosewood Hong Kong • Victoria Dockside', 'Mandarin Oriental • Central'],
      activities: ['Victoria Peak sunrise hike', 'Harbour junk cruise', 'Temple Street night food tour'],
      hotelLink: 'https://www.ihg.com',
      flightLink: 'https://www.cathaypacific.com',
    },
    {
      name: 'Rio de Janeiro Vibrance',
      location: 'Rio de Janeiro, Brazil',
      description: 'Caipirinhas, Copacabana waves, and samba-fueled nights.',
      image: BrazilImg,
      rating: 4.7,
      hotels: ['Belmond Copacabana Palace', 'Hotel Fasano Rio', 'Emiliano Rio'],
      activities: ['Corcovado private sunrise tour', 'Sugarloaf cable car sunset', 'Favela art walk + samba workshop'],
      hotelLink: 'https://www.belmond.com',
      flightLink: 'https://www.latamairlines.com',
    },
  ];

  return (
    <section
      id="recommendations"
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Our Recommendations
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-6" />
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Handpicked escapes blending iconic stays, curated activities, and flexible flight options.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="rounded-3xl overflow-hidden border border-white/15 bg-white/5 backdrop-blur-xl shadow-2xl"
            >
              <div className="relative h-56">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
                <div className="absolute top-4 right-4 flex items-center gap-2 rounded-full bg-black/40 px-3 py-1 text-yellow-300">
                  <StarIcon className="w-4 h-4" />
                  <span className="text-sm font-semibold">{destination.rating.toFixed(1)}</span>
                </div>
                <div className="absolute bottom-4 left-4 text-left">
                  <p className="text-sm uppercase tracking-widest text-gray-200">Destination</p>
                  <h4 className="text-2xl font-bold text-white">{destination.name}</h4>
                  <p className="text-blue-200 font-semibold">{destination.location}</p>
                </div>
              </div>

              <div className="p-8 space-y-6">
                <p className="text-gray-200">{destination.description}</p>

                <div>
                  <p className="text-sm uppercase tracking-wide text-blue-200 mb-2">
                    Signature Hotels
                  </p>
                  <ul className="space-y-2 text-white/90">
                    {destination.hotels.map((hotel) => (
                      <li key={hotel} className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-blue-400" />
                        {hotel}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-sm uppercase tracking-wide text-blue-200 mb-2">
                    Must-Do Activities
                  </p>
                  <ul className="space-y-2 text-white/90">
                    {destination.activities.map((activity) => (
                      <li key={activity} className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-purple-400" />
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => navigate('/catalog/hotels')}
                    className="flex-1 text-center bg-white text-gray-900 font-semibold py-3 rounded-2xl hover:bg-gray-100 transition-colors duration-300 cursor-pointer"
                  >
                    Browse Hotels
                  </button>
                  <button
                    onClick={() => navigate('/catalog/flights')}
                    className="flex-1 text-center bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 rounded-2xl hover:shadow-lg hover:shadow-purple-500/40 transition-all duration-300 cursor-pointer"
                  >
                    Browse Flights
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Recommendations;
