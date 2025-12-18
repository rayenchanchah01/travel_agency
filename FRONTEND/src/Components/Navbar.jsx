import { useState, useEffect } from 'react';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === '/';

  // Check if user is logged in on component mount and route changes
  useEffect(() => {
    checkUserLoggedIn();
  }, [location]); // Re-check when location changes

  const checkUserLoggedIn = () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        // Clear invalid data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { path: '/', label: 'Home' },
    { path: '/countries', label: 'Countries' },
    { path: '/recommendations', label: 'Recommendations' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path) => location.pathname === path;

  const getNavbarBg = () => {
    if (isHomePage && !hasScrolled) return 'bg-transparent';
    return 'bg-white/95 backdrop-blur-md shadow-lg';
  };

  const getTextColor = (isActiveLink = false) => {
    if (isActiveLink) return 'text-white';
    if (isHomePage && !hasScrolled) return 'text-white';
    return 'text-gray-700';
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getNavbarBg()}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center cursor-pointer">
            <h1 className={`text-2xl sm:text-3xl font-bold transition-colors duration-300 ${getTextColor()}`}>
              Enjoy Travel
            </h1>
          </Link>

          <ul className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-300 ${
                    isActive(item.path)
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : isHomePage && !hasScrolled
                      ? 'text-white hover:bg-white/10'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Auth Buttons / User Info */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                {/* User Info */}
                <div className="flex items-center gap-2">
                  <UserCircleIcon className={`w-6 h-6 ${isHomePage && !hasScrolled ? 'text-white' : 'text-gray-700'}`} />
                  <span className={`font-semibold ${isHomePage && !hasScrolled ? 'text-white' : 'text-gray-700'}`}>
                    {user.name || user.email?.split('@')[0]}
                  </span>
                </div>
                
                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <>
                {/* Sign In Button */}
                <Link
                  to="/signin"
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-300 ${
                    isHomePage && !hasScrolled ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Sign In
                </Link>

                {/* Sign Up Button */}
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
              isHomePage && !hasScrolled ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {isMobileMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200">
          <ul className="px-4 py-4 space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block w-full text-left px-4 py-3 rounded-lg font-semibold transition-colors duration-300 ${
                    isActive(item.path)
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            
            {/* Mobile Auth Links */}
            <li className="pt-4">
              {user ? (
                <div className="flex flex-col gap-2">
                  {/* User Info */}
                  <div className="flex items-center gap-2 px-4 py-3">
                    <UserCircleIcon className="w-5 h-5 text-gray-700" />
                    <span className="text-gray-700 font-semibold">
                      {user.name || user.email?.split('@')[0]}
                    </span>
                  </div>
                  
                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    to="/signin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full px-4 py-3 rounded-lg text-gray-700 font-semibold hover:bg-gray-100 transition-colors duration-300"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;