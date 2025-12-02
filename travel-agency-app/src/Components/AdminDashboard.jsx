import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  GlobeAltIcon,
  PaperAirplaneIcon,
  TrashIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

/**
 * Admin Dashboard Component
 * Allows admin to add/delete countries and flights
 * Data is stored in component state (local storage could be added later)
 */
function AdminDashboard() {
  // State for countries list
  const [countries, setCountries] = useState([
    { id: 1, name: 'Italy', region: 'Europe', highlight: 'Amalfi Coast itineraries', status: 'Live' },
    { id: 2, name: 'Japan', region: 'Asia', highlight: 'Cherry blossom tours', status: 'Draft' },
  ]);

  // State for flights list
  const [flights, setFlights] = useState([
    { id: 1, code: 'ET-204', airline: 'Enjoy Travel Air', from: 'LAX', to: 'HKG', price: 1299 },
    { id: 2, code: 'ET-350', airline: 'Enjoy Travel Air', from: 'JFK', to: 'GIG', price: 899 },
  ]);

  // State for country form inputs
  const [countryForm, setCountryForm] = useState({
    name: '',
    region: '',
    highlight: '',
    status: 'Draft',
  });

  // State for flight form inputs
  const [flightForm, setFlightForm] = useState({
    code: '',
    airline: '',
    from: '',
    to: '',
    price: '',
  });

  // Handle country form input changes
  const handleCountryChange = (e) => {
    const { name, value } = e.target;
    setCountryForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle flight form input changes
  const handleFlightChange = (e) => {
    const { name, value } = e.target;
    setFlightForm((prev) => ({ ...prev, [name]: value }));
  };

  // Add a new country
  const handleAddCountry = (e) => {
    e.preventDefault();
    if (!countryForm.name || !countryForm.region) return;
    
    const newCountry = {
      id: Date.now(), // Simple ID generation
      ...countryForm,
    };
    
    setCountries((prev) => [...prev, newCountry]);
    // Reset form
    setCountryForm({ name: '', region: '', highlight: '', status: 'Draft' });
  };

  // Delete a country
  const handleDeleteCountry = (id) => {
    setCountries((prev) => prev.filter((country) => country.id !== id));
  };

  // Add a new flight
  const handleAddFlight = (e) => {
    e.preventDefault();
    if (!flightForm.code || !flightForm.airline || !flightForm.from || !flightForm.to) return;
    
    const newFlight = {
      id: Date.now(),
      ...flightForm,
      price: Number(flightForm.price || 0), // Convert price to number
    };
    
    setFlights((prev) => [...prev, newFlight]);
    // Reset form
    setFlightForm({ code: '', airline: '', from: '', to: '', price: '' });
  };

  // Delete a flight
  const handleDeleteFlight = (id) => {
    setFlights((prev) => prev.filter((flight) => flight.id !== id));
  };

  return (
    <section
      id="admin"
      className="bg-slate-950 py-20 px-4 sm:px-6 lg:px-8 text-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-300">
            Control Center
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold mt-2">
            Admin Dashboard
          </h2>
          <p className="text-gray-400 mt-4 max-w-3xl mx-auto">
            Manage destinations, flights, and operational readiness from a single interface.
            Data is stored locally for prototype purposes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Country Management Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500">
                <GlobeAltIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Country Catalog</h3>
                <p className="text-sm text-gray-300">Add or remove featured destinations</p>
              </div>
            </div>

            {/* Add Country Form */}
            <form onSubmit={handleAddCountry} className="space-y-4 mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-300 mb-1 block">Country Name</label>
                  <input
                    name="name"
                    value={countryForm.name}
                    onChange={handleCountryChange}
                    placeholder="e.g., Morocco"
                    className="w-full rounded-2xl bg-white/10 border border-white/10 px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-300 mb-1 block">Region</label>
                  <input
                    name="region"
                    value={countryForm.region}
                    onChange={handleCountryChange}
                    placeholder="e.g., Africa"
                    className="w-full rounded-2xl bg-white/10 border border-white/10 px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-1 block">Highlight</label>
                <input
                  name="highlight"
                  value={countryForm.highlight}
                  onChange={handleCountryChange}
                  placeholder="Luxury Sahara desert camp"
                  className="w-full rounded-2xl bg-white/10 border border-white/10 px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                <div>
                  <label className="text-sm text-gray-300 mb-1 block">Status</label>
                  <select
                    name="status"
                    value={countryForm.status}
                    onChange={handleCountryChange}
                    className="w-full rounded-2xl bg-white/10 border border-white/10 px-4 py-3 text-white focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Live">Live</option>
                    <option value="Review">Review</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 py-3 font-semibold shadow-lg shadow-purple-500/30"
                >
                  <PlusIcon className="w-5 h-5" />
                  Add Country
                </button>
              </div>
            </form>

            {/* Countries List */}
            <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
              {countries.map((country) => (
                <div
                  key={country.id}
                  className="flex items-start justify-between rounded-2xl bg-white/5 border border-white/10 p-4"
                >
                  <div>
                    <p className="text-lg font-semibold">{country.name}</p>
                    <p className="text-sm text-gray-400">{country.region}</p>
                    <p className="text-sm text-gray-300 mt-2">{country.highlight || 'No highlight yet'}</p>
                    <span className="mt-3 inline-flex rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-300">
                      {country.status}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteCountry(country.id)}
                    className="rounded-full p-2 text-gray-400 hover:bg-red-500/10 hover:text-red-300"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              ))}
              {countries.length === 0 && (
                <p className="text-center text-gray-500">No countries added yet.</p>
              )}
            </div>
          </motion.div>

          {/* Flight Management Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500">
                <PaperAirplaneIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Flight Operations</h3>
                <p className="text-sm text-gray-300">Configure preferred flight inventory</p>
              </div>
            </div>

            {/* Add Flight Form */}
            <form onSubmit={handleAddFlight} className="space-y-4 mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-300 mb-1 block">Flight Code</label>
                  <input
                    name="code"
                    value={flightForm.code}
                    onChange={handleFlightChange}
                    placeholder="ET-450"
                    className="w-full rounded-2xl bg-white/10 border border-white/10 px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-300 mb-1 block">Airline</label>
                  <input
                    name="airline"
                    value={flightForm.airline}
                    onChange={handleFlightChange}
                    placeholder="Enjoy Travel Air"
                    className="w-full rounded-2xl bg-white/10 border border-white/10 px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm text-gray-300 mb-1 block">From</label>
                  <input
                    name="from"
                    value={flightForm.from}
                    onChange={handleFlightChange}
                    placeholder="LAX"
                    className="w-full rounded-2xl bg-white/10 border border-white/10 px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-300 mb-1 block">To</label>
                  <input
                    name="to"
                    value={flightForm.to}
                    onChange={handleFlightChange}
                    placeholder="HND"
                    className="w-full rounded-2xl bg-white/10 border border-white/10 px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-300 mb-1 block">Price (USD)</label>
                  <input
                    name="price"
                    type="number"
                    value={flightForm.price}
                    onChange={handleFlightChange}
                    placeholder="1299"
                    className="w-full rounded-2xl bg-white/10 border border-white/10 px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 py-3 font-semibold shadow-lg shadow-pink-500/30"
              >
                <PlusIcon className="w-5 h-5" />
                Add Flight
              </button>
            </form>

            {/* Flights List */}
            <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
              {flights.map((flight) => (
                <div
                  key={flight.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 flex items-center justify-between"
                >
                  <div>
                    <p className="text-lg font-semibold">{flight.code}</p>
                    <p className="text-sm text-gray-400">{flight.airline}</p>
                    <p className="text-sm text-gray-300 mt-2">
                      {flight.from} → {flight.to}
                    </p>
                    <p className="text-sm text-blue-300 font-semibold mt-1">
                      ${flight.price.toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteFlight(flight.id)}
                    className="rounded-full p-2 text-gray-400 hover:bg-red-500/10 hover:text-red-300"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              ))}
              {flights.length === 0 && (
                <p className="text-center text-gray-500">No flights configured yet.</p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AdminDashboard;
