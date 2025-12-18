import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import {
  StarIcon,
  GlobeAltIcon,
  BuildingOfficeIcon,
  PaperAirplaneIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

function TravelCatalog() {
  const { view } = useParams();
  const navigate = useNavigate();

  const [hotels, setHotels] = useState([]);
  const [flights, setFlights] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(view || "all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [hotelsRes, flightsRes, countriesRes, citiesRes] =
          await Promise.all([
            axios.get("http://localhost:5000/api/hotels"),
            axios.get("http://localhost:5000/api/flights"),
            axios.get("http://localhost:5000/api/countries"),
            axios.get("http://localhost:5000/api/cities"),
          ]);

        setHotels(hotelsRes.data?.hotels ?? hotelsRes.data ?? []);
        // backend now returns { flights: [...] } for consistency (but we support old shapes)
        setFlights(flightsRes.data?.flights ?? flightsRes.data ?? []);
        // backend returns { countries: [...] } and { cities: [...] }
        setCountries(countriesRes.data?.countries ?? countriesRes.data ?? []);
        setCities(citiesRes.data?.cities ?? citiesRes.data ?? []);
      } catch (err) {
        setError(err.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getAverageRating = (reviews = []) => {
    if (!reviews.length) return "0.0";
    return (
      reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    ).toFixed(1);
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="animate-spin h-16 w-16 border-t-2 border-blue-500 rounded-full" />
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <p className="text-red-400">{error}</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-950 text-white pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <p className="text-sm tracking-widest text-blue-300 uppercase">
              Database Collection
            </p>
            <h1 className="text-5xl font-bold mt-3">Travel Catalog</h1>
          </div>
          <button
            onClick={() => navigate("/")}
            className="border border-white/20 px-6 py-3 rounded-full hover:bg-white/10"
          >
            Back Home
          </button>
        </div>

        {/* TABS */}
        <div className="flex flex-wrap gap-3 mb-10">
          {["all", "hotels", "flights", "countries", "cities"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full font-semibold ${
                activeTab === tab
                  ? "bg-gradient-to-r from-blue-500 to-purple-500"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* HOTELS */}
        {(activeTab === "all" || activeTab === "hotels") && (
          <CatalogSection
            icon={BuildingOfficeIcon}
            title="Hotels"
            count={hotels.length}
          >
            <Grid>
              {hotels.map((h) => (
                <Card key={h._id}>
                  <div className="flex justify-between mb-2">
                    <h3 className="font-semibold">{h.name}</h3>
                    <span className="flex items-center gap-1 text-yellow-300">
                      <StarIcon className="w-4 h-4" />
                      {h.stars}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{h.city}</p>
                  <p className="text-emerald-300 font-bold mt-2">
                    ${h.pricePerNight}/night
                  </p>
                  {h.reviews?.length > 0 && (
                    <p className="text-sm text-gray-400 mt-1">
                      Avg {getAverageRating(h.reviews)}/10
                    </p>
                  )}
                </Card>
              ))}
            </Grid>
          </CatalogSection>
        )}

        {/* FLIGHTS ✅ FIXED */}
        {(activeTab === "all" || activeTab === "flights") && (
          <CatalogSection
            icon={PaperAirplaneIcon}
            title="Flights"
            count={flights.length}
          >
            <Grid>
              {flights.map((f) => (
                <Card key={f._id}>
                  <h3 className="font-semibold mb-2">
                    {f.origin.city} → {f.destination.city}
                  </h3>

                  <p className="text-sm text-gray-400">
                    Airline: {f.airline}
                  </p>

                  <p className="text-sm text-gray-400">
                    Departure:{" "}
                    {(() => {
                      const d = f.departure ?? f.departureTime ?? f?.departure?.$date ?? null;
                      const date = d ? new Date(d) : null;
                      return date ? date.toLocaleString() : "N/A";
                    })()}
                  </p>

                  {/* PRICE OBJECT FIX */}
                  <div className="mt-3 space-y-1 text-sm">
                    <p className="text-emerald-300 font-bold">
                      Economy: ${f.price?.economy}
                    </p>
                    <p className="text-blue-300">
                      Business: ${f.price?.business}
                    </p>
                    <p className="text-purple-300">
                      First Class: ${f.price?.firstClass}
                    </p>
                  </div>
                </Card>
              ))}
            </Grid>
          </CatalogSection>
        )}

        {/* COUNTRIES */}
        {(activeTab === "all" || activeTab === "countries") && (
          <CatalogSection
            icon={GlobeAltIcon}
            title="Countries"
            count={countries.length}
          >
            <Grid>
              {countries.map((c) => (
                <Card key={c._id}>
                  <h3 className="font-semibold">{c.name}</h3>
                  <p className="text-sm text-gray-400">{c.isoCode}</p>
                </Card>
              ))}
            </Grid>
          </CatalogSection>
        )}

        {/* CITIES */}
        {(activeTab === "all" || activeTab === "cities") && (
          <CatalogSection
            icon={MapPinIcon}
            title="Cities"
            count={cities.length}
          >
            <Grid>
              {cities.map((c) => (
                <Card key={c._id}>
                  <h3 className="font-semibold">{c.name}</h3>
                  <p className="text-sm text-gray-400">{c.country}</p>
                </Card>
              ))}
            </Grid>
          </CatalogSection>
        )}
      </div>
    </section>
  );
}

/* 🔹 REUSABLE COMPONENTS 🔹 */

const CatalogSection = ({ icon: Icon, title, count, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="mb-12 rounded-3xl bg-white/5 border border-white/10 p-8"
  >
    <div className="flex items-center gap-4 mb-6">
      <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500">
        <Icon className="w-6 h-6" />
      </div>
      <h2 className="text-2xl font-bold">
        {title} ({count})
      </h2>
    </div>
    {children}
  </motion.div>
);

const Grid = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {children}
  </div>
);

const Card = ({ children }) => (
  <div className="rounded-2xl bg-white/5 border border-white/10 p-5 hover:bg-white/10 transition">
    {children}
  </div>
);

export default TravelCatalog;
