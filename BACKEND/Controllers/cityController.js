const City = require('../Models/city');

const getCities = async (req, res) => {
  try {
    const cities = await City.find();
    if (cities && cities.length > 0) {
      return res.status(200).json({ cities });
    }
    return res.status(404).json({ msg: 'No cities found' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Error on getting cities' });
  }
};

module.exports = {
  getCities,
};
