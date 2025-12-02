const { exec } = require('child_process');
const util = require('util');
const path = require('path');

const execPromise = util.promisify(exec);

const seedScripts = [
  { name: 'Countries', file: 'seedCountries.js' },
  { name: 'Cities', file: 'seedCities.js' },
  { name: 'Hotels', file: 'seedHotels.js' },
  { name: 'Users & Admins', file: 'seedUsers.js' },
  { name: 'Flights', file: 'seedFlights.js' }
];


const runSeeds = async () => {
  console.log('🌱 Starting database seeding...\n');

  const seedsDir = __dirname;

  for (const script of seedScripts) {
    console.log(`📦 Seeding ${script.name}...`);
    try {
      const scriptPath = path.join(seedsDir, script.file);
      const { stdout, stderr } = await execPromise(`node "${scriptPath}"`);
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