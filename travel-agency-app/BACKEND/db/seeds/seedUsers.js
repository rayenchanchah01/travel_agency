const bcrypt = require("bcrypt"); 

const axios = require('axios');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  address: {
    street: { type: String },
    city: { type: String },
    country: { type: String },
    zipCode: { type: String }
  },
  dateOfBirth: { type: Date },
  profilePicture: { type: String },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now },
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }]
});

const User = mongoose.model('User', UserSchema);

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.URL);
    console.log('Connected to MongoDB');

    
    const admin = {
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@travelagency.com',
      password: 'admin123', 
      phone: '+216-123-456-789',
      address: {
        street: '123 Admin Street',
        city: 'Tunis',
        country: 'Tunisia',
        zipCode: '1000'
      },
      dateOfBirth: new Date('1990-01-01'),
      profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
      role: 'admin',
      createdAt: new Date(),
      bookings: []
    };

    // Fetch random users from Random User API for regular users
    console.log('Fetching users from Random User API...');
    const response = await axios.get('https://randomuser.me/api/?results=20&nat=us,gb,fr,es,de,tn');
    const randomUsers = response.data.results;

    const regularUsers = randomUsers.map((user) => ({
      firstName: user.name.first,
      lastName: user.name.last,
      email: user.email,
      password: 'password123', // In production, hash passwords with bcrypt!
      phone: user.phone,
      address: {
        street: `${user.location.street.number} ${user.location.street.name}`,
        city: user.location.city,
        country: user.location.country,
        zipCode: user.location.postcode.toString()
      },
      dateOfBirth: new Date(user.dob.date),
      profilePicture: user.picture.large,
      role: 'user',
      createdAt: new Date(user.registered.date),
      bookings: []
    }));

    // Combine admin and regular users
    const allUsers = [admin, ...regularUsers];
    // Hash passwords for all users
    for (let user of allUsers) {
        user.password = await bcrypt.hash(user.password, 10);
}
    await User.deleteMany({});
    console.log('Cleared existing users');

    const result = await User.insertMany(allUsers);
    console.log(` Successfully seeded ${result.length} users`);
    console.log(`   - 1 admin`);
    console.log(`   - ${result.length - 1} regular users`);

    console.log('\n Admin Account Credentials:');
    console.log('   Email: admin@travelagency.com');
    console.log('   Password: admin123');
    console.log('\n IMPORTANT: Hash passwords with bcrypt in production!\n');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding users:', error.message);
    mongoose.connection.close();
  }
};

seedUsers();