import React from 'react';
import { motion } from 'framer-motion';
import {
  StarIcon,
  GlobeAltIcon,
  BuildingOfficeIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';

/**
 * TravelCatalog Component
 * Full catalog page showing all places, hotels, and flights
 * This is a separate page from the landing page
 */

// Sample data for places
const places = [
  {
    name: 'Santorini, Greece',
    rating: 4.9,
    highlights: ['Caldera sunset cruise', 'Private wine cave tasting', 'Volcanic beach club'],
    bestSeason: 'April – October',
  },
  {
    name: 'Kyoto, Japan',
    rating: 4.8,
    highlights: ['Tea ceremony in Gion', 'Arashiyama bamboo forest', 'Kaiseki dining'],
    bestSeason: 'March – May',
  },
  {
    name: 'Cape Town, South Africa',
    rating: 4.7,
    highlights: ['Table Mountain helicopter', 'Winelands sidecar tour', 'Penguin beach brunch'],
    bestSeason: 'September – March',
  },
];

// Sample data for hotels
const hotels = [
  {
    name: 'Aman Tokyo',
    location: 'Tokyo, Japan',
    perks: ['Skyline infinity pool', 'Onsen spa rituals', 'Michelin dining partners'],
  },
  {
    name: 'Le Sirenuse',
    location: 'Positano, Italy',
    perks: ['Private beach launch', "Chef's table tasting", 'Vintage Riva rides'],
  },
  {
    name: 'Soneva Jani',
    location: 'Noonu Atoll, Maldives',
    perks: ['Slide villas', 'Overwater cinema', 'Astronomy dinners'],
  },
];

// Sample data for flights
const flights = [
  { code: 'ET-204', airline: 'Enjoy Travel Air', route: 'LAX → HKG', duration: '15h 40m', price: 1299 },
  { code: 'ET-350', airline: 'Enjoy Travel Air', route: 'JFK → GIG', duration: '9h 10m', price: 899 },
  { code: 'ET-811', airline: 'Enjoy Travel Air', route: 'CDG → CPT', duration: '11h 55m', price: 1049 },
];

function TravelCatalog({ onBack }) {
  return (
    <section className="min-h-screen bg-slate-950 text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-blue-300">Full Collection</p>
            <h1 className="text-4xl sm:text-5xl font-bold mt-3">Flights • Hotels • Places</h1>
            <p className="text-gray-400 mt-4 max-w-2xl">
              A concierge-ready directory of our premium inventory. Each item is vetted for luxury,
              reliability, and experience value.
            </p>
          </div>
          {/* Back Button */}
          <button
            onClick={onBack}
            className="self-start rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
          >
            Back to Landing
          </button>
        </div>

        {/* Two Column Layout: Places and Hotels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Places Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500">
                <GlobeAltIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Iconic Places</h3>
                <p className="text-sm text-gray-300">Ratings from our travel curators</p>
              </div>
            </div>

            {/* Places List */}
            <div className="space-y-4">
              {places.map((place) => (
                <div key={place.name} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-lg font-semibold">{place.name}</p>
                      <p className="text-sm text-gray-400">Best season: {place.bestSeason}</p>
                    </div>
                    {/* Rating Display */}
                    <div className="flex items-center gap-1 text-yellow-300 font-semibold">
                      <StarIcon className="w-5 h-5" />
                      {place.rating.toFixed(1)}
                    </div>
                  </div>
                  {/* Highlights List */}
                  <ul className="mt-4 space-y-2 text-gray-300">
                    {place.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Hotels Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500">
                <BuildingOfficeIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Flagship Hotels</h3>
                <p className="text-sm text-gray-300">Hand-selected partnerships</p>
              </div>
            </div>
            
            {/* Hotels List */}
            <div className="space-y-4">
              {hotels.map((hotel) => (
                <div key={hotel.name} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-lg font-semibold">{hotel.name}</p>
                      <p className="text-sm text-gray-400">{hotel.location}</p>
                    </div>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-widest text-white">
                      Partner
                    </span>
                  </div>
                  {/* Perks List */}
                  <ul className="mt-4 space-y-2 text-gray-300">
                    {hotel.perks.map((perk) => (
                      <li key={perk} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-pink-400" />
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Flights Section - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500">
              <PaperAirplaneIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Featured Flights</h3>
              <p className="text-sm text-gray-300">Flexible fares with lounge access</p>
            </div>
          </div>
          
          {/* Flights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {flights.map((flight) => (
              <div key={flight.code} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-lg font-semibold">{flight.code}</p>
                <p className="text-sm text-gray-400">{flight.airline}</p>
                <p className="mt-2 text-white">{flight.route}</p>
                <p className="text-sm text-gray-400">{flight.duration}</p>
                <p className="mt-4 text-xl font-bold text-emerald-300">
                  ${flight.price.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default TravelCatalog;
