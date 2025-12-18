import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  UserIcon,
  LockClosedIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { useNavigate } from "react-router-dom";

/**
 * Sign Up Component
 */
function SignUp() {
  const sectionRef = useRef(null);
  const isVisible = useInView(sectionRef, { once: true, amount: 0.3 });
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    userId: "",
    email: "",
    password: "",
    phoneCode: "",
    phoneNumber: "",
    city: "",
    country: "",
    dateOfBirth: "",
    profilePicture: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Create payload object
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      // Add optional fields only if they have values
      if (formData.userId.trim() !== "") payload.userId = formData.userId;
      if (formData.phoneCode.trim() !== "" || formData.phoneNumber.trim() !== "") {
        payload.phone = `${formData.phoneCode}${formData.phoneNumber}`;
      }
      if (formData.city.trim() !== "") payload.city = formData.city;
      if (formData.country.trim() !== "") payload.country = formData.country;
      if (formData.dateOfBirth.trim() !== "") payload.dateOfBirth = formData.dateOfBirth;
      if (formData.profilePicture.trim() !== "") payload.profilePicture = formData.profilePicture;

      const res = await axios.post("http://localhost:5000/api/auth/signup", payload);

      // Store token and user data in localStorage so Navbar updates
      if (res?.data?.token) {
        localStorage.setItem("token", res.data.token);
      }
      if (res?.data?.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }

      // Notify Navbar about auth change and navigate home
      window.dispatchEvent(new CustomEvent('auth:changed', { detail: res.data.user }));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.msg || err.message || "Signup failed");
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
            <UserIcon className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-900">Sign Up</h2>
          <p className="text-gray-600 mt-2">
            Create your travel account to manage bookings and favorites
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Full Name */}
          <FormInput
            name="name"
            label="Full Name *"
            icon={<UserIcon className="w-5 h-5 text-gray-400" />}
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            required={true}
          />

          {/* User ID */}
          <FormInput
            name="userId"
            label="User ID (optional)"
            icon={<UserIcon className="w-5 h-5 text-gray-400" />}
            value={formData.userId}
            onChange={handleChange}
            placeholder="Leave blank for auto-generate"
            required={false}
          />

          {/* Email */}
          <FormInput
            name="email"
            label="Email *"
            icon={<EnvelopeIcon className="w-5 h-5 text-gray-400" />}
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required={true}
          />

          {/* Password */}
          <FormInput
            name="password"
            label="Password *"
            icon={<LockClosedIcon className="w-5 h-5 text-gray-400" />}
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Your password"
            required={true}
          />

          {/* Phone (Code + Number) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Phone (optional)
            </label>
            <div className="flex gap-2">
              {/* Country calling code dropdown */}
              <select
                name="phoneCode"
                value={formData.phoneCode}
                onChange={handleChange}
                className="w-1/2 pl-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Code (optional)</option>
                {countryPhoneCodes.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} ({c.country})
                  </option>
                ))}
              </select>

              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number (optional)"
                className="w-1/2 pl-4 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* City */}
          <FormInput
            name="city"
            label="City (optional)"
            icon={<MapPinIcon className="w-5 h-5 text-gray-400" />}
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            required={false}
          />

          {/* Country dropdown */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Country (optional)
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Your Country (optional)</option>
              {allCountries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          {/* Date of Birth */}
          <FormInput
            name="dateOfBirth"
            label="Date of Birth (optional)"
            icon={<CalendarIcon className="w-5 h-5 text-gray-400" />}
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required={false}
          />

          {/* Profile Picture - Now optional */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Profile Picture URL (optional)
            </label>
            <input
              type="text"
              name="profilePicture"
              value={formData.profilePicture}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
              placeholder="Leave blank for default avatar"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm font-semibold">{error}</p>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-6 rounded-xl text-lg"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
}

/**
 * Reusable form input
 */
const FormInput = ({
  name,
  label,
  icon,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {label}
    </label>
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2">{icon}</div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
        required={required}
      />
    </div>
  </div>
);

/**
 * Full alphabetical list of countries
 */
const allCountries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "Estonia",
  "Ethiopia",
  "Finland",
  "France",
  "Georgia",
  "Germany",
  "Greece",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Ireland",
  "Israel",
  "Italy",
  "Japan",
  "Kenya",
  "Malaysia",
  "Mexico",
  "Netherlands",
  "New Zealand",
  "Norway",
  "Pakistan",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Romania",
  "Russia",
  "Saudi Arabia",
  "Serbia",
  "Singapore",
  "South Africa",
  "South Korea",
  "Spain",
  "Sweden",
  "Switzerland",
  "Thailand",
  "Turkey",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Vietnam",
].sort();

/**
 * Comprehensive list of country phone codes
 */
const countryPhoneCodes = [
  { country: "Afghanistan", code: "+93" },
  { country: "Albania", code: "+355" },
  { country: "Algeria", code: "+213" },
  { country: "Andorra", code: "+376" },
  { country: "Angola", code: "+244" },
  { country: "Argentina", code: "+54" },
  { country: "Armenia", code: "+374" },
  { country: "Australia", code: "+61" },
  { country: "Austria", code: "+43" },
  { country: "Azerbaijan", code: "+994" },
  { country: "Bahamas", code: "+1-242" },
  { country: "Bahrain", code: "+973" },
  { country: "Bangladesh", code: "+880" },
  { country: "Barbados", code: "+1-246" },
  { country: "Belarus", code: "+375" },
  { country: "Belgium", code: "+32" },
  { country: "Belize", code: "+501" },
  { country: "Benin", code: "+229" },
  { country: "Bhutan", code: "+975" },
  { country: "Bolivia", code: "+591" },
  { country: "Botswana", code: "+267" },
  { country: "Brazil", code: "+55" },
  { country: "Brunei", code: "+673" },
  { country: "Bulgaria", code: "+359" },
  { country: "Cambodia", code: "+855" },
  { country: "Cameroon", code: "+237" },
  { country: "Canada", code: "+1" },
  { country: "Chile", code: "+56" },
  { country: "China", code: "+86" },
  { country: "Colombia", code: "+57" },
  { country: "Costa Rica", code: "+506" },
  { country: "Croatia", code: "+385" },
  { country: "Cuba", code: "+53" },
  { country: "Cyprus", code: "+357" },
  { country: "Czech Republic", code: "+420" },
  { country: "Denmark", code: "+45" },
  { country: "Dominican Republic", code: "+1-809" },
  { country: "Ecuador", code: "+593" },
  { country: "Egypt", code: "+20" },
  { country: "Estonia", code: "+372" },
  { country: "Ethiopia", code: "+251" },
  { country: "Finland", code: "+358" },
  { country: "France", code: "+33" },
  { country: "Georgia", code: "+995" },
  { country: "Germany", code: "+49" },
  { country: "Greece", code: "+30" },
  { country: "Hungary", code: "+36" },
  { country: "Iceland", code: "+354" },
  { country: "India", code: "+91" },
  { country: "Indonesia", code: "+62" },
  { country: "Ireland", code: "+353" },
  { country: "Israel", code: "+972" },
  { country: "Italy", code: "+39" },
  { country: "Japan", code: "+81" },
  { country: "Kenya", code: "+254" },
  { country: "Malaysia", code: "+60" },
  { country: "Mexico", code: "+52" },
  { country: "Netherlands", code: "+31" },
  { country: "New Zealand", code: "+64" },
  { country: "Nigeria", code: "+234" },
  { country: "Norway", code: "+47" },
  { country: "Pakistan", code: "+92" },
  { country: "Peru", code: "+51" },
  { country: "Philippines", code: "+63" },
  { country: "Poland", code: "+48" },
  { country: "Portugal", code: "+351" },
  { country: "Romania", code: "+40" },
  { country: "Russia", code: "+7" },
  { country: "Saudi Arabia", code: "+966" },
  { country: "Serbia", code: "+381" },
  { country: "Singapore", code: "+65" },
  { country: "South Africa", code: "+27" },
].sort((a, b) => a.country.localeCompare(b.country));

export default SignUp;