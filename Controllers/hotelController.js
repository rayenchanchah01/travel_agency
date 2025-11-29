
const Hotel = require("../Models/hotel");


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


const getHotels = async (req, res) => {
  try {
    const { stars, city, minPrice, maxPrice, search, checkIn, checkOut, days } = req.query;
    let filter = {};

    if (stars) filter.stars = Number(stars);
    if (city) filter.city = { $regex: city, $options: "i" }; 
    if (minPrice || maxPrice) {
      filter.pricePerNight = {};
      if (minPrice) filter.pricePerNight.$gte = Number(minPrice);
      if (maxPrice) filter.pricePerNight.$lte = Number(maxPrice);
    }
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    let finalCheckIn = checkIn || null;
    let finalCheckOut = checkOut || null;
    let nights = null;

    
    if (checkOut && !checkIn) {
      return res.status(400).json({ msg: "checkIn is required when checkOut is provided." });
    }

    
    if (checkIn && !checkOut) {
      if (!days) {
        return res.status(400).json({ msg: "days is required when checkOut is not provided." });
      }
      const stayDays = Number(days);
      if (stayDays < 1 || stayDays > 30) {
        return res.status(400).json({ msg: "days must be between 1 and 30." });
      }

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

      if (nights === null) {
        return res.status(400).json({ msg: "checkOut must be after checkIn." });
      }
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
    res.status(500).json({ msg: error.message });
  }
};


const createHotel = async (req, res) => {
  try {
    const hotelData = req.body;

    if (!hotelData) {
      return res.status(400).json({ msg: "No data provided" });
    }

    const newHotel = new Hotel(hotelData);
    await newHotel.save();

    res.status(201).json({
      msg: "Hotel created successfully!",
      hotel: newHotel
    });

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const reserveHotel = async (req, res) => {
  try {
    const hotelId = req.params.id;
    const { checkIn, checkOut } = req.body;

    if (!checkIn || !checkOut) {
      return res.status(400).json({ msg: "checkIn and checkOut are required" });
    }

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) return res.status(404).json({ msg: "Hotel not found" });

    if (!isHotelAvailable(hotel, checkIn, checkOut)) {
      return res.status(400).json({ msg: "Hotel not available for the selected dates" });
    }

    
    hotel.reservations = hotel.reservations || [];
    hotel.reservations.push({ checkIn, checkOut });
    await hotel.save();

    res.status(200).json({ msg: "Reservation successful", hotel });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


const addReview = async (req, res) => {
  try {
    const hotelId = req.params.id;
    const { user, rating, comment } = req.body;

    if (!user || rating === undefined) {
      return res.status(400).json({ msg: "user and rating are required" });
    }

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) return res.status(404).json({ msg: "Hotel not found" });

    hotel.reviews = hotel.reviews || [];
    hotel.reviews.push({
      user,
      rating: Number(rating),
      comment
    });

    await hotel.save();

    res.status(200).json({ msg: "Review added", hotel });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = { getHotels, createHotel, reserveHotel, addReview };
