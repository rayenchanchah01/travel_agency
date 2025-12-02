// seeds/seedHotels.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Hotel = require('../Models/hotel');

const seedHotels = async () => {
  try {
    await mongoose.connect(process.env.URL);
    console.log('Connected to MongoDB');

    // Clear existing hotels
    await Hotel.deleteMany({});
    console.log('Cleared existing hotels');

    // Dummy hotels
    const hotels = [
      {
        name: 'Grand Palace Hotel',
        stars: '5',
        foundedIn: '1995',
        city: 'Paris',
        price: 250,
        pricePerNight: 250,
        photos: [
          'https://res.cloudinary.com/demo/image/upload/hotel1.jpg',
          'https://res.cloudinary.com/demo/image/upload/hotel2.jpg'
        ],
        location: {
          type: 'Point',
          coordinates: [2.3522, 48.8566],
          nearbyAttractions: []
        },
        reviews: [],
        reservations: []
      },
      {
        name: 'Seaside Resort',
        stars: '4',
        foundedIn: '2005',
        city: 'Barcelona',
        price: 180,
        pricePerNight: 180,
        photos: [
          'https://res.cloudinary.com/demo/image/upload/hotel3.jpg',
          'https://res.cloudinary.com/demo/image/upload/hotel4.jpg'
        ],
        location: {
          type: 'Point',
          coordinates: [2.1734, 41.3851],
          nearbyAttractions: []
        },
        reviews: [],
        reservations: []
      },
      {
        name: 'Mountain View Inn',
        stars: '3',
        foundedIn: '2010',
        city: 'Rome',
        price: 120,
        pricePerNight: 120,
        photos: [
          'https://res.cloudinary.com/demo/image/upload/hotel5.jpg',
          'https://res.cloudinary.com/demo/image/upload/hotel6.jpg'
        ],
        location: {
          type: 'Point',
          coordinates: [12.4964, 41.9028],
          nearbyAttractions: []
        },
        reviews: [],
        reservations: []
      }
    ];

    // Add more hotels programmatically to have many hotels
    const cities = ['Athens', 'Istanbul', 'Dubai', 'Tokyo', 'New York'];
    for (let i = 0; i < 20; i++) {
  hotels.push({
    name: `Hotel ${i + 1}`,
    stars: `${Math.floor(Math.random() * 3) + 3}`,
    foundedIn: `${2000 + Math.floor(Math.random() * 20)}`,
    city: cities[i % cities.length],
    price: Math.floor(Math.random() * 200) + 100,
    pricePerNight: Math.floor(Math.random() * 200) + 100,
    photos: [
      'https://res.cloudinary.com/demo/image/upload/hotel1.jpg',
      'https://res.cloudinary.com/demo/image/upload/hotel2.jpg'
    ],
    location: {
      type: 'Point',
      coordinates: [
        Math.random() * 360 - 180,  // longitude
        Math.random() * 180 - 90    // latitude
      ],
      nearbyAttractions: []
    },
    reviews: [],
    reservations: []
  });
}


    const result = await Hotel.insertMany(hotels);
    console.log(`Successfully seeded ${result.length} hotels`);

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding hotels:', error.message);
    mongoose.connection.close();
  }
};

seedHotels();
