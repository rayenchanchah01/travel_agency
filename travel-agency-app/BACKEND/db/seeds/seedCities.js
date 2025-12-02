const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const CitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  center: {
    lat: { type: Number },
    lng: { type: Number },
  },
  image: { type: String },
  description: { type: String }
});

const City = mongoose.model('City', CitySchema);

const seedCities = async () => {
  try {
    await mongoose.connect(process.env.URL);
    console.log('Connected to MongoDB');

    // Popular tourist cities with coordinates
    const cities = [
      // France
      { name: 'Paris', country: 'France', center: { lat: 48.8566, lng: 2.3522 }, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34', description: 'The City of Light' },
      { name: 'Nice', country: 'France', center: { lat: 43.7102, lng: 7.2620 }, image: 'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216', description: 'French Riviera gem' },
      
      // Spain
      { name: 'Barcelona', country: 'Spain', center: { lat: 41.3851, lng: 2.1734 }, image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded', description: 'Gaudi\'s masterpiece city' },
      { name: 'Madrid', country: 'Spain', center: { lat: 40.4168, lng: -3.7038 }, image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4', description: 'Spain\'s vibrant capital' },
      
      // Italy
      { name: 'Rome', country: 'Italy', center: { lat: 41.9028, lng: 12.4964 }, image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5', description: 'The Eternal City' },
      { name: 'Venice', country: 'Italy', center: { lat: 45.4408, lng: 12.3155 }, image: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0', description: 'City of canals' },
      { name: 'Florence', country: 'Italy', center: { lat: 43.7696, lng: 11.2558 }, image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5', description: 'Renaissance capital' },
      
      // Greece
      { name: 'Athens', country: 'Greece', center: { lat: 37.9838, lng: 23.7275 }, image: 'https://images.unsplash.com/photo-1555993539-1732b0258235', description: 'Ancient history hub' },
      { name: 'Santorini', country: 'Greece', center: { lat: 36.3932, lng: 25.4615 }, image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff', description: 'Iconic white and blue' },
      
      // Turkey
      { name: 'Istanbul', country: 'Turkey', center: { lat: 41.0082, lng: 28.9784 }, image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200', description: 'Where East meets West' },
      
      // Tunisia
      { name: 'Tunis', country: 'Tunisia', center: { lat: 36.8065, lng: 10.1815 }, image: 'https://images.unsplash.com/photo-1585870391137-6f0f87ff2d87', description: 'Gateway to North Africa' },
      { name: 'Sousse', country: 'Tunisia', center: { lat: 35.8256, lng: 10.6378 }, image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5', description: 'Pearl of the Sahel' },
      
      // UAE
      { name: 'Dubai', country: 'United Arab Emirates', center: { lat: 25.2048, lng: 55.2708 }, image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c', description: 'Modern luxury destination' },
      
      // Thailand
      { name: 'Bangkok', country: 'Thailand', center: { lat: 13.7563, lng: 100.5018 }, image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365', description: 'Temple city' },
      { name: 'Phuket', country: 'Thailand', center: { lat: 7.8804, lng: 98.3923 }, image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5', description: 'Beach paradise' },
      
      // Japan
      { name: 'Tokyo', country: 'Japan', center: { lat: 35.6762, lng: 139.6503 }, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf', description: 'Ultra-modern metropolis' },
      { name: 'Kyoto', country: 'Japan', center: { lat: 35.0116, lng: 135.7681 }, image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e', description: 'Traditional Japan' },
      
      // USA
      { name: 'New York', country: 'United States', center: { lat: 40.7128, lng: -74.0060 }, image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9', description: 'The Big Apple' },
      { name: 'Los Angeles', country: 'United States', center: { lat: 34.0522, lng: -118.2437 }, image: 'https://images.unsplash.com/photo-1534190239940-9ba8944ea261', description: 'City of Angels' },
      
      // UK
      { name: 'London', country: 'United Kingdom', center: { lat: 51.5074, lng: -0.1278 }, image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad', description: 'Historic British capital' },
      
      // Egypt
      { name: 'Cairo', country: 'Egypt', center: { lat: 30.0444, lng: 31.2357 }, image: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a', description: 'Land of Pyramids' },
    ];

    await City.deleteMany({});
    console.log('Cleared existing cities');

    const result = await City.insertMany(cities);
    console.log(` Successfully seeded ${result.length} cities`);

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding cities:', error.message);
    mongoose.connection.close();
  }
};

seedCities();