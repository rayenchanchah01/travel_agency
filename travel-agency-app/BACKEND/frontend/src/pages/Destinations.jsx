import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import './Destinations.css'
import { getCountries, getHotels } from '../services/api'

function Destinations() {
  const [searchParams] = useSearchParams()
  const cityFilter = searchParams.get('city')
  const [destinations, setDestinations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true)
        // Build hotel filters based on query params
        const hotelFilters = cityFilter ? { city: cityFilter } : {}
        
        // Fetch both countries and hotels, then combine them
        const [countriesData, hotelsData] = await Promise.all([
          getCountries().catch(() => []), // Fallback to empty array if fails
          getHotels(hotelFilters).catch(() => ({ hotels: [] })) // Fallback to empty array if fails
        ]);

        // Transform countries data into destinations format
        const countriesDestinations = Array.isArray(countriesData) 
          ? countriesData.map((country, index) => ({
              id: `country-${country._id || index}`,
              name: country.name,
              image: country.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
              description: `Explore the beautiful country of ${country.name}`,
              price: 'From $999',
              type: 'country'
            }))
          : [];

        // Transform hotels data into destinations format
        const hotelsDestinations = hotelsData.hotels 
          ? hotelsData.hotels.map((hotel) => ({
              id: `hotel-${hotel._id}`,
              name: `${hotel.name}, ${hotel.city}`,
              image: hotel.photos && hotel.photos.length > 0 
                ? hotel.photos[0] 
                : 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
              description: `${hotel.stars} star hotel in ${hotel.city}`,
              price: `$${hotel.pricePerNight || hotel.price}/night`,
              type: 'hotel'
            }))
          : [];

        // Combine and set destinations
        const allDestinations = [...countriesDestinations, ...hotelsDestinations]
        setDestinations(allDestinations.length > 0 ? allDestinations : [])
        setError(null)
      } catch (err) {
        console.error('Error fetching destinations:', err)
        setError('Failed to load destinations. Please try again later.')
        setDestinations([])
      } finally {
        setLoading(false)
      }
    }

    fetchDestinations()
  }, [cityFilter])

  if (loading) {
    return (
      <div className="destinations-page">
        <div className="page-header">
          <h1>Explore Our Destinations</h1>
          <p>Discover amazing places around the world</p>
        </div>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Loading destinations...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="destinations-page">
        <div className="page-header">
          <h1>Explore Our Destinations</h1>
          <p>Discover amazing places around the world</p>
        </div>
        <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="destinations-page">
      <div className="page-header">
        <h1>Explore Our Destinations</h1>
        <p>
          {cityFilter 
            ? `Hotels in ${cityFilter}` 
            : 'Discover amazing places around the world'}
        </p>
      </div>
      
      {destinations.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>No destinations available. Please check your database connection.</p>
        </div>
      ) : (
        <div className="destinations-grid">
          {destinations.map(destination => (
            <div key={destination.id} className="destination-card">
              <div className="destination-image">
                <img src={destination.image} alt={destination.name} />
                <div className="destination-overlay">
                  <span className="destination-price">{destination.price}</span>
                </div>
              </div>
              <div className="destination-content">
                <h3>{destination.name}</h3>
                <p>{destination.description}</p>
                <button className="destination-btn">View Details</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Destinations

