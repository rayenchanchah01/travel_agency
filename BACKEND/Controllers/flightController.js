const Flight = require('../Models/flight');

// @desc    Get all flights (with optional origin/destination filters)
// @route   GET /api/flights
// @access  Public
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
    res.status(200).json(flights);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get flight by ID
// @route   GET /api/flights/:id
// @access  Public
const getFlightById = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }
    res.status(200).json(flight);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid flight ID' });
    }
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create a new flight
// @route   POST /api/flights
// @access  Public (or admin)
const createFlight = async (req, res) => {
  try {
    const flightData = req.body;
    const newFlight = new Flight(flightData);
    await newFlight.save();

    res.status(201).json({
      message: 'Flight created successfully',
      flight: newFlight
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Invalid flight data', error: error.message });
  }
};

module.exports = {
  getFlights,
  getFlightById,
  createFlight
};
