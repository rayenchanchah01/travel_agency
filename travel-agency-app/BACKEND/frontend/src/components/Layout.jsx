import { Link, useLocation } from 'react-router-dom'
import './Layout.css'

function Layout({ children }) {
  const location = useLocation()

  return (
    <div className="app">
      <header className="header">
        <div className="header-container">
          <Link to="/" className="logo">
            <svg className="logo-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              {/* Globe circle */}
              <circle cx="24" cy="24" r="18" stroke="url(#logoGradient)" strokeWidth="2.5" fill="none"/>
              {/* Latitude lines */}
              <ellipse cx="24" cy="24" rx="16" ry="4" stroke="url(#logoGradient)" strokeWidth="1.5" fill="none" opacity="0.5"/>
              <ellipse cx="24" cy="24" rx="12" ry="3" stroke="url(#logoGradient)" strokeWidth="1.5" fill="none" opacity="0.5"/>
              {/* Longitude line */}
              <path d="M24 6 L24 42" stroke="url(#logoGradient)" strokeWidth="1.5" fill="none" opacity="0.5"/>
              {/* Airplane - stylized */}
              <g transform="translate(24, 24)">
                <path d="M-8 0 L8 0 M0 -6 L6 0 L0 6 M0 -6 L-6 0 L0 6" stroke="url(#logoGradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                <circle cx="0" cy="0" r="2.5" fill="url(#logoGradient)"/>
              </g>
            </svg>
            <span>Wanderlust</span>
          </Link>
          <nav className="nav">
            <Link to="/destinations" className={location.pathname === '/destinations' ? 'active' : ''}>
              Destinations
            </Link>
            <Link to="/book-hotel" className={location.pathname === '/book-hotel' ? 'active' : ''}>
              Book Hotel
            </Link>
            <Link to="/destinations" className={location.pathname === '/experiences' ? 'active' : ''}>
              Experiences
            </Link>
            <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
              Contact
            </Link>
            <button className="login-btn">Log In</button>
          </nav>
        </div>
      </header>
      <main className="main-content">
        {children}
      </main>
    </div>
  )
}

export default Layout

