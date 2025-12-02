import { useNavigate } from 'react-router-dom'
import './Homepage.css'

function Homepage() {
  const navigate = useNavigate()

  const handleBookHotel = () => {
    navigate('/book-hotel')
  }

  return (
    <div className="homepage">
      <div className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Discover Your Next Adventure</h1>
          <p className="hero-subtitle">
            Explore breathtaking destinations around the world with expertly crafted journeys.
          </p>
          
          <div className="search-form">
            <div className="search-input-group">
              <div className="search-input-wrapper">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
                <input type="text" placeholder="Where to?" />
              </div>
              <div className="search-input-wrapper">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <input type="text" placeholder="When?" />
              </div>
              <div className="search-input-wrapper">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <input type="text" placeholder="Travel type" />
              </div>
            </div>
            <div className="search-buttons">
              <button className="search-btn">Search Destinations</button>
              <button className="book-hotel-btn" onClick={handleBookHotel}>Book Hotel</button>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Homepage

