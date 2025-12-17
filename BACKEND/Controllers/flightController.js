const Flight = require('../Models/flight');

const getFlights = async (req, res) => {
  try {
    const { origin, destination } = req.query;
    let filter = {};

    if (origin) {
      filter['origin.city'] = { $regex: origin, $options: 'i' };
    }
    if (destination) {
      filter['destination.city'] = { $regex: destination, $options: 'i' };
    }

    const flights = await Flight.find(filter);
    res.status(200).json(flights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFlightById = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }
    res.status(200).json(flight);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createFlight = async (req, res) => {
  try {
    const flight = new Flight(req.body);
    await flight.save();
    res.status(201).json(flight);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getFlights, getFlightById, createFlight };
