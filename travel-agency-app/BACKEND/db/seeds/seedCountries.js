const axios = require('axios');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Country = require('../Models/country');

const seedCountries = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.URL);
    console.log('Connected to MongoDB');

    
    const allCountries = [
  { name: { common: 'France' }, cca2: 'FR', latlng: [46.2276, 2.2137], flags: { png: 'https://flagcdn.com/fr.png' } },
  { name: { common: 'Spain' }, cca2: 'ES', latlng: [40.4637, -3.7492], flags: { png: 'https://flagcdn.com/es.png' } },
  { name: { common: 'United States' }, cca2: 'US', latlng: [37.0902, -95.7129], flags: { png: 'https://flagcdn.com/us.png' } },
  { name: { common: 'Italy' }, cca2: 'IT', latlng: [41.8719, 12.5674], flags: { png: 'https://flagcdn.com/it.png' } },
  { name: { common: 'Turkey' }, cca2: 'TR', latlng: [38.9637, 35.2433], flags: { png: 'https://flagcdn.com/tr.png' } },
  { name: { common: 'Thailand' }, cca2: 'TH', latlng: [15.8700, 100.9925], flags: { png: 'https://flagcdn.com/th.png' } },
  { name: { common: 'Germany' }, cca2: 'DE', latlng: [51.1657, 10.4515], flags: { png: 'https://flagcdn.com/de.png' } },
  { name: { common: 'United Kingdom' }, cca2: 'GB', latlng: [55.3781, -3.4360], flags: { png: 'https://flagcdn.com/gb.png' } },
  { name: { common: 'Japan' }, cca2: 'JP', latlng: [36.2048, 138.2529], flags: { png: 'https://flagcdn.com/jp.png' } },
  { name: { common: 'Greece' }, cca2: 'GR', latlng: [39.0742, 21.8243], flags: { png: 'https://flagcdn.com/gr.png' } },
  { name: { common: 'Portugal' }, cca2: 'PT', latlng: [39.3999, -8.2245], flags: { png: 'https://flagcdn.com/pt.png' } },
  { name: { common: 'Egypt' }, cca2: 'EG', latlng: [26.8206, 30.8025], flags: { png: 'https://flagcdn.com/eg.png' } },
  { name: { common: 'Morocco' }, cca2: 'MA', latlng: [31.7917, -7.0926], flags: { png: 'https://flagcdn.com/ma.png' } },
  { name: { common: 'Tunisia' }, cca2: 'TN', latlng: [33.8869, 9.5375], flags: { png: 'https://flagcdn.com/tn.png' } },
  { name: { common: 'UAE' }, cca2: 'AE', latlng: [23.4241, 53.8478], flags: { png: 'https://flagcdn.com/ae.png' } },
  { name: { common: 'Canada' }, cca2: 'CA', latlng: [56.1304, -106.3468], flags: { png: 'https://flagcdn.com/ca.png' } },
  { name: { common: 'Australia' }, cca2: 'AU', latlng: [-25.2744, 133.7751], flags: { png: 'https://flagcdn.com/au.png' } },
  { name: { common: 'Brazil' }, cca2: 'BR', latlng: [-14.2350, -51.9253], flags: { png: 'https://flagcdn.com/br.png' } },
  { name: { common: 'India' }, cca2: 'IN', latlng: [20.5937, 78.9629], flags: { png: 'https://flagcdn.com/in.png' } }
];


    // List of popular tourist countries
    const popularCountries = [
      'France', 'Spain', 'United States', 'Italy', 'Turkey', 
      'Thailand', 'Germany', 'United Kingdom', 'Japan', 
      'Greece', 'Portugal', 'Egypt', 'Morocco', 'Tunisia', 
      'UAE', 'Canada', 'Australia', 'Brazil', 'India'
    ];

    // Filter and create country objects
    const countries = [];
    for (let i = 0; i < allCountries.length; i++) {
      const country = allCountries[i];
      const countryName = country.name.common;
      
      // Check if this country is in our popular list
      if (popularCountries.includes(countryName)) {
        const newCountry = {
          name: countryName,
          isoCode: country.cca2,
          center: {
            lat: country.latlng ? country.latlng[0] : 0,
            lng: country.latlng ? country.latlng[1] : 0
          },
          image: country.flags.png
        };
        countries.push(newCountry);
      }
    }

    // Delete old countries
    await Country.deleteMany({});
    console.log('Deleted old countries');

    // Save new countries
    await Country.insertMany(countries);
    console.log('Successfully saved ' + countries.length + ' countries');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error.message);
    mongoose.connection.close();
  }
};

seedCountries();