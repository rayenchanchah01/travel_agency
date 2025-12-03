import { useState, useEffect } from 'react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import AuthModal from './AuthModal';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [authModalType, setAuthModalType] = useState(null);
  const location = useLocation();
  const { user, logout, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/recommendations', label: 'Recommendations' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        hasScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center cursor-pointer">
            <h1
              className={`text-2xl sm:text-3xl font-bold transition-colors duration-300 ${
                hasScrolled ? 'text-gray-900' : 'text-white'
              }`}
            >
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
                      : hasScrolled
                        ? 'text-gray-700 hover:bg-gray-100'
                        : 'text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                {isAdmin() && (
                  <Link
                    to="/admin"
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg font-semibold transition-colors duration-300 ${
                      isActive('/admin')
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : hasScrolled
                          ? 'text-purple-600 hover:bg-purple-50'
                          : 'text-purple-300 hover:bg-white/10'
                    }`}
                  >
                    <ShieldCheckIcon className="w-5 h-5" />
                    Dashboard
                  </Link>
                )}
                <span className={`font-medium ${hasScrolled ? 'text-gray-700' : 'text-white'}`}>
                  Hi, {user.firstName}
                </span>
                <button
                  onClick={logout}
                  className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setAuthModalType('signin')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-300 ${
                    hasScrolled
                      ? 'text-gray-700 hover:bg-gray-100'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setAuthModalType('signup')}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
              hasScrolled
                ? 'text-gray-700 hover:bg-gray-100'
                : 'text-white hover:bg-white/10'
            }`}
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

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
            {user ? (
              <li className="pt-4 space-y-2">
                {isAdmin() && (
                  <Link
                    to="/admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 w-full px-4 py-3 rounded-lg text-purple-600 font-semibold hover:bg-purple-50 transition-colors duration-300"
                  >
                    <ShieldCheckIcon className="w-5 h-5" />
                    Dashboard
                  </Link>
                )}
                <div className="px-4 py-2 text-gray-600">Hi, {user.firstName}</div>
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li className="pt-4 space-y-2">
                <button
                  onClick={() => {
                    setAuthModalType('signin');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 rounded-lg text-gray-700 font-semibold hover:bg-gray-100 transition-colors duration-300"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setAuthModalType('signup');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Sign Up
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
      {authModalType && (
        <AuthModal
          type={authModalType}
          onClose={() => setAuthModalType(null)}
        />
      )}
    </nav>
  );
}

export default Navbar;
