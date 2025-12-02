const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const FlightSchema = new mongoose.Schema({
  flightNumber: { type: String, required: true, unique: true },
  airline: { type: String, required: true },
  origin: {
    city: { type: String, required: true },
    airport: { type: String, required: true },
    code: { type: String, required: true }
  },
  destination: {
    city: { type: String, required: true },
    airport: { type: String, required: true },
    code: { type: String, required: true }
  },
  departure: { type: Date, required: true },
  arrival: { type: Date, required: true },
  duration: { type: String }, // e.g., "2h 30m"
  price: {
    economy: { type: Number, required: true },
    business: { type: Number },
    firstClass: { type: Number }
  },
  availableSeats: {
    economy: { type: Number, default: 150 },
    business: { type: Number, default: 30 },
    firstClass: { type: Number, default: 10 }
  },
  aircraft: { type: String },
  status: { type: String, enum: ['scheduled', 'delayed', 'cancelled', 'boarding', 'departed'], default: 'scheduled' }
});

const Flight = mongoose.model('Flight', FlightSchema);

const seedFlights = async () => {
  try {
    await mongoose.connect(process.env.URL);
    console.log('Connected to MongoDB');

    // Create realistic flight data
    const airlines = ['Air France', 'British Airways', 'Lufthansa', 'Emirates', 'Turkish Airlines', 'Qatar Airways', 'Tunisair'];
    
    const routes = [
      { origin: { city: 'Paris', airport: 'Charles de Gaulle', code: 'CDG' }, destination: { city: 'Tunis', airport: 'Tunis-Carthage', code: 'TUN' }, duration: '2h 15m', aircraft: 'Airbus A320' },
      { origin: { city: 'London', airport: 'Heathrow', code: 'LHR' }, destination: { city: 'Paris', airport: 'Charles de Gaulle', code: 'CDG' }, duration: '1h 20m', aircraft: 'Boeing 737' },
      { origin: { city: 'Dubai', airport: 'Dubai International', code: 'DXB' }, destination: { city: 'Bangkok', airport: 'Suvarnabhumi', code: 'BKK' }, duration: '6h 30m', aircraft: 'Boeing 777' },
      { origin: { city: 'New York', airport: 'JFK International', code: 'JFK' }, destination: { city: 'London', airport: 'Heathrow', code: 'LHR' }, duration: '7h 15m', aircraft: 'Airbus A380' },
      { origin: { city: 'Tokyo', airport: 'Narita International', code: 'NRT' }, destination: { city: 'Dubai', airport: 'Dubai International', code: 'DXB' }, duration: '10h 45m', aircraft: 'Boeing 787' },
      { origin: { city: 'Rome', airport: 'Fiumicino', code: 'FCO' }, destination: { city: 'Barcelona', airport: 'El Prat', code: 'BCN' }, duration: '1h 50m', aircraft: 'Airbus A319' },
      { origin: { city: 'Istanbul', airport: 'Istanbul Airport', code: 'IST' }, destination: { city: 'Cairo', airport: 'Cairo International', code: 'CAI' }, duration: '2h 30m', aircraft: 'Airbus A321' },
      { origin: { city: 'Bangkok', airport: 'Suvarnabhumi', code: 'BKK' }, destination: { city: 'Tokyo', airport: 'Narita International', code: 'NRT' }, duration: '6h 20m', aircraft: 'Boeing 787' },
      { origin: { city: 'Tunis', airport: 'Tunis-Carthage', code: 'TUN' }, destination: { city: 'Rome', airport: 'Fiumicino', code: 'FCO' }, duration: '1h 30m', aircraft: 'Airbus A320' },
      { origin: { city: 'Barcelona', airport: 'El Prat', code: 'BCN' }, destination: { city: 'Dubai', airport: 'Dubai International', code: 'DXB' }, duration: '7h 10m', aircraft: 'Boeing 777' }
    ];

    const flights = [];
    const startDate = new Date('2025-12-01');

    // Generate flights for next 30 days
    for (let day = 0; day < 30; day++) {
      routes.forEach((route, routeIndex) => {
        // 2-3 flights per day per route
        for (let flightNum = 0; flightNum < 2; flightNum++) {
          const departureDate = new Date(startDate);
          departureDate.setDate(startDate.getDate() + day);
          
          // Set departure times (morning, afternoon, evening)
          const hours = [8, 14, 20][flightNum % 3];
          departureDate.setHours(hours, 0, 0, 0);

          // Calculate arrival time based on duration
          const durationMinutes = parseInt(route.duration) * 60 + parseInt(route.duration.split('h ')[1]) || 0;
          const arrivalDate = new Date(departureDate.getTime() + durationMinutes * 60000);

          const basePrice = 200 + routeIndex * 50;

          flights.push({
            flightNumber: `${airlines[routeIndex % airlines.length].substring(0, 2).toUpperCase()}${1000 + flights.length}`,
            airline: airlines[routeIndex % airlines.length],
            origin: route.origin,
            destination: route.destination,
            departure: departureDate,
            arrival: arrivalDate,
            duration: route.duration,
            price: {
              economy: basePrice,
              business: basePrice * 3,
              firstClass: basePrice * 5
            },
            availableSeats: {
              economy: Math.floor(Math.random() * 100) + 50,
              business: Math.floor(Math.random() * 20) + 10,
              firstClass: Math.floor(Math.random() * 5) + 5
            },
            aircraft: route.aircraft,
            status: 'scheduled'
          });
        }
      });
    }

    await Flight.deleteMany({});
    console.log('Cleared existing flights');

    const result = await Flight.insertMany(flights);
    console.log(`✅ Successfully seeded ${result.length} flights`);
    console.log(`   - ${routes.length} routes`);
    console.log(`   - Flights for next 30 days`);

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding flights:', error.message);
    mongoose.connection.close();
  }
};

seedFlights();