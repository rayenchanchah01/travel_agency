import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './BookHotel.css'
import { getCities } from '../services/api'

function BookHotel() {
  const [cities, setCities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoading(true)
        const filters = searchTerm ? { name: searchTerm } : {}
        const citiesData = await getCities(filters)
        setCities(Array.isArray(citiesData) ? citiesData : [])
        setError(null)
      } catch (err) {
        console.error('Error fetching cities:', err)
        setError('Failed to load cities. Please try again later.')
        setCities([])
      } finally {
        setLoading(false)
      }
    }

    fetchCities()
  }, [searchTerm])

  const handleSearch = (e) => {
    e.preventDefault()
    // The search will be triggered by the useEffect when searchTerm changes
  }

  const handleCityClick = (city) => {
    // Navigate to hotels page filtered by city
    navigate(`/destinations?city=${encodeURIComponent(city.name)}`)
  }

  return (
    <div className="book-hotel-page">
      <div className="page-header">
        <h1>Book a Hotel</h1>
        <p>Select a city to view available hotels</p>
      </div>

      <div className="search-section">
        <form onSubmit={handleSearch} className="city-search-form">
          <div className="search-input-wrapper">
            <svg className="input-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
              <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <input
              type="text"
              placeholder="Search cities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="city-search-input"
            />
          </div>
          <button type="submit" className="search-btn">Search</button>
        </form>
      </div>

      {loading && (
        <div className="loading-container">
          <p>Loading cities...</p>
        </div>
      )}

      {error && (
        <div className="error-container">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && cities.length === 0 && (
        <div className="empty-container">
          <p>No cities found. Please check your database connection or try a different search term.</p>
        </div>
      )}

      {!loading && !error && cities.length > 0 && (
        <div className="cities-grid">
          {cities.map((city) => (
            <div
              key={city._id}
              className="city-card"
              onClick={() => handleCityClick(city)}
            >
              <div className="city-image">
                {city.image ? (
                  <img src={city.image} alt={city.name} />
                ) : (
                  <div className="city-placeholder">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" fill="none"/>
                      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
                    </svg>
                  </div>
                )}
              </div>
              <div className="city-content">
                <h3 className="city-name">{city.name}</h3>
                <p className="city-country">{city.country}</p>
                {city.description && (
                  <p className="city-description">{city.description}</p>
                )}
                <button className="view-hotels-btn">View Hotels</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default BookHotel

