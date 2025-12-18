import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { UserIcon, LockClosedIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const sectionRef = useRef(null);
  const isVisible = useInView(sectionRef, { once: true, amount: 0.3 });
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Check backend URL - make sure this matches your route
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // Store token and user data in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Redirect to home page
      navigate("/");
      
      // Force page reload to update navbar state
      window.location.reload();
      
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-br from-white to-blue-50 py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isVisible ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="mx-auto w-16 h-16 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mb-4"
          >
            <ShieldCheckIcon className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-900">Sign In</h2>
          <p className="text-gray-600 mt-2">
            Access your travel account to manage bookings and favorites
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <UserIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <LockClosedIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Your password"
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm font-semibold">{error}</p>
          )}

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-6 rounded-xl text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </motion.button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 mt-6 text-sm">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-blue-500 font-semibold hover:underline"
          >
            Sign Up
          </a>
        </p>
      </motion.div>
    </section>
  );
}

export default SignIn;