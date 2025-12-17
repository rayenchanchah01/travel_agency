const Hotel = require("../Models/hotel");

// Helper: Check if hotel is available for given dates
function isHotelAvailable(hotel, checkIn, checkOut) {
  if (!hotel.reservations || hotel.reservations.length === 0) return true;

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  return hotel.reservations.every(res => {
    const resIn = new Date(res.checkIn);
    const resOut = new Date(res.checkOut);
    return checkOutDate <= resIn || checkInDate >= resOut;
  });
}

// @desc    Get hotels with filters and availability
// @route   GET /api/hotels
// @access  Public
const getHotels = async (req, res) => {
  try {
    const { stars, city, country, minPrice, maxPrice, search, checkIn, checkOut, days } = req.query;
    const filter = {};

    if (stars) filter.stars = Number(stars);
    if (city) filter.city = { $regex: city, $options: "i" };
    if (country) filter.country = { $regex: country, $options: "i" };
    if (minPrice || maxPrice) {
      filter.pricePerNight = {};
      if (minPrice) filter.pricePerNight.$gte = Number(minPrice);
      if (maxPrice) filter.pricePerNight.$lte = Number(maxPrice);
    }
    if (search) filter.name = { $regex: search, $options: "i" };

    let finalCheckIn = checkIn || null;
    let finalCheckOut = checkOut || null;
    let nights = null;

    // Validate dates
    if (checkOut && !checkIn) {
      return res.status(400).json({ message: "checkIn is required when checkOut is provided." });
    }

    if (checkIn && !checkOut) {
      if (!days) return res.status(400).json({ message: "days is required when checkOut is not provided." });
      const stayDays = Number(days);
      if (stayDays < 1 || stayDays > 30) return res.status(400).json({ message: "days must be between 1 and 30." });

      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkInDate);
      checkOutDate.setDate(checkOutDate.getDate() + stayDays);
      finalCheckOut = checkOutDate.toISOString().split("T")[0];
      nights = stayDays;
    }

    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      nights = (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24);
      nights = Number.isFinite(nights) && nights > 0 ? Math.floor(nights) : null;
      if (!nights) return res.status(400).json({ message: "checkOut must be after checkIn." });
    }

    let hotels = await Hotel.find(filter);

    if (finalCheckIn && finalCheckOut) {
      hotels = hotels.filter(hotel => isHotelAvailable(hotel, finalCheckIn, finalCheckOut));
    }

    const results = hotels.map(hotel => ({
      ...hotel.toObject(),
      nights,
      finalCheckIn,
      finalCheckOut,
      totalCost: nights ? hotel.pricePerNight * nights : null
    }));

    res.status(200).json({
      count: results.length,
      nights,
      finalCheckIn,
      finalCheckOut,
      hotels: results
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create a new hotel
// @route   POST /api/hotels
// @access  Public or Admin
const createHotel = async (req, res) => {
  try {
    const hotelData = req.body;
    if (!hotelData || !hotelData.name || !hotelData.city) {
      return res.status(400).json({ message: "Name and city are required." });
    }

    const newHotel = new Hotel(hotelData);
    await newHotel.save();
    res.status(201).json({ message: "Hotel created successfully.", hotel: newHotel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Reserve a hotel
// @route   POST /api/hotels/:id/reserve
// @access  Public
const reserveHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const { checkIn, checkOut } = req.body;

    if (!checkIn || !checkOut) return res.status(400).json({ message: "checkIn and checkOut are required." });

    const hotel = await Hotel.findById(id);
    if (!hotel) return res.status(404).json({ message: "Hotel not found." });

    if (!isHotelAvailable(hotel, checkIn, checkOut)) {
      return res.status(400).json({ message: "Hotel not available for the selected dates." });
    }

    hotel.reservations = hotel.reservations || [];
    hotel.reservations.push({ checkIn, checkOut });
    await hotel.save();

    res.status(200).json({ message: "Reservation successful.", hotel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Add a review to a hotel
// @route   POST /api/hotels/:id/review
// @access  Public
const addReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { user, rating, comment } = req.body;

    if (!user || rating === undefined) {
      return res.status(400).json({ message: "user and rating are required." });
    }

    const hotel = await Hotel.findById(id);
    if (!hotel) return res.status(404).json({ message: "Hotel not found." });

    hotel.reviews = hotel.reviews || [];
    hotel.reviews.push({ user, rating: Number(rating), comment });
    await hotel.save();

    res.status(200).json({ message: "Review added successfully.", hotel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  getHotels,
  createHotel,
  reserveHotel,
  addReview
};
