const { exec } = require('child_process');
const util = require('util');

const execPromise = util.promisify(exec);

const seedScripts = [
  { name: 'Countries', file: 'seeds/seedCountries.js' },
  { name: 'Cities', file: 'seeds/seedCities.js' },
  { name: 'Hotels', file: 'seeds/seedHotels.js' },
  { name: 'Users & Admins', file: 'seeds/seedUsers.js' },
  { name: 'Flights', file: 'seeds/seedFlights.js' }
];


const runSeeds = async () => {
  console.log('🌱 Starting database seeding...\n');

  for (const script of seedScripts) {
    console.log(`📦 Seeding ${script.name}...`);
    try {
      const { stdout, stderr } = await execPromise(`node ${script.file}`);
      console.log(stdout);
      if (stderr) console.error(stderr);
    } catch (error) {
      console.error(`❌ Error seeding ${script.name}:`, error.message);
    }
    console.log('---\n');
  }

  console.log('✅ All seeding complete!');
};

runSeeds();