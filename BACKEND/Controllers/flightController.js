const Flight = require('../Models/flight');


const getFlights = async (req, res) => {
  try {
    const { origin, destination } = req.query;
    const filter = {};

    if (origin) {
      filter['origin.city'] = { $regex: origin, $options: 'i' }; // case-insensitive
    }
    if (destination) {
      filter['destination.city'] = { $regex: destination, $options: 'i' };
    }

    const flights = await Flight.find(filter);
    if (flights && flights.length > 0) {
      return res.status(200).json({ flights });
    }
    return res.status(404).json({ msg: 'No flights found' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Error on getting flights' });
  }
};

module.exports = {
  getFlights,
};
