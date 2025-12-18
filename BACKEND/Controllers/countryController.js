const Country = require('../Models/country');

const getCountries = async (req, res) => {
  try {
    const { name } = req.query;

    const filter = {};
    if (name) {
      filter.name = { $regex: name, $options: 'i' }; // case-insensitive search
    }

    const countries = await Country.find(filter);
    if (countries && countries.length > 0) {
      return res.status(200).json({ countries });
    }
    return res.status(404).json({ msg: 'No countries found' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Error on getting countries' });
  }
};

module.exports = {
  getCountries,
};
