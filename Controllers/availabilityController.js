const Availability = require("../Models/availability");

// Check availability for a resource
const checkAvailability = async (req, res) => {
  try {
    const { resourceType, resourceId, startDate, endDate } = req.query;

    if (!resourceType || !resourceId || !startDate || !endDate) {
      return res.status(400).json({ msg: "resourceType, resourceId, startDate, endDate are required" });
    }

    const availability = await Availability.checkAvailability(resourceType, resourceId, startDate, endDate);
    
    const isFullyAvailable = availability.length > 0 && 
      availability.every(a => {
        if (resourceType === 'hotel') return a.roomsAvailable > 0;
        if (resourceType === 'activity') return a.spotsAvailable > 0;
        return true;
      });

    res.status(200).json({
      isAvailable: isFullyAvailable,
      details: availability
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get availability for a specific resource
const getAvailability = async (req, res) => {
  try {
    const { resourceType, resourceId } = req.params;
    const { month, year } = req.query;

    let filter = { resourceType, resourceId };

    if (month && year) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);
      filter.date = { $gte: startDate, $lte: endDate };
    }

    const availability = await Availability.find(filter).sort({ date: 1 });
    res.status(200).json({ count: availability.length, availability });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Set availability for a resource
const setAvailability = async (req, res) => {
  try {
    const { resourceType, resourceId, date, roomsAvailable, totalRooms, spotsAvailable, totalSpots, priceModifier, timeSlots } = req.body;

    if (!resourceType || !resourceId || !date) {
      return res.status(400).json({ msg: "resourceType, resourceId, date are required" });
    }

    const availability = await Availability.findOneAndUpdate(
      { resourceType, resourceId, date: new Date(date) },
      {
        resourceType,
        resourceId,
        date: new Date(date),
        roomsAvailable,
        totalRooms,
        spotsAvailable,
        totalSpots,
        priceModifier,
        timeSlots,
        updatedAt: Date.now()
      },
      { upsert: true, new: true, runValidators: true }
    );

    res.status(200).json({ msg: "Availability set", availability });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Bulk set availability for date range
const bulkSetAvailability = async (req, res) => {
  try {
    const { resourceType, resourceId, startDate, endDate, roomsAvailable, totalRooms, spotsAvailable, totalSpots, priceModifier } = req.body;

    if (!resourceType || !resourceId || !startDate || !endDate) {
      return res.status(400).json({ msg: "resourceType, resourceId, startDate, endDate are required" });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const updates = [];

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      updates.push({
        updateOne: {
          filter: { resourceType, resourceId, date: new Date(d) },
          update: {
            $set: { resourceType, resourceId, date: new Date(d), roomsAvailable, totalRooms, spotsAvailable, totalSpots, priceModifier, updatedAt: Date.now() }
          },
          upsert: true
        }
      });
    }

    const result = await Availability.bulkWrite(updates);
    res.status(200).json({ msg: "Bulk availability set", modified: result.modifiedCount, upserted: result.upsertedCount });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Block dates
const blockDates = async (req, res) => {
  try {
    const { resourceType, resourceId, startDate, endDate, reason } = req.body;

    if (!resourceType || !resourceId || !startDate || !endDate) {
      return res.status(400).json({ msg: "resourceType, resourceId, startDate, endDate are required" });
    }

    await Availability.blockDates(resourceType, resourceId, startDate, endDate, reason);
    res.status(200).json({ msg: "Dates blocked successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Unblock dates
const unblockDates = async (req, res) => {
  try {
    const { resourceType, resourceId, startDate, endDate } = req.body;

    if (!resourceType || !resourceId || !startDate || !endDate) {
      return res.status(400).json({ msg: "resourceType, resourceId, startDate, endDate are required" });
    }

    await Availability.updateMany(
      { resourceType, resourceId, date: { $gte: new Date(startDate), $lte: new Date(endDate) } },
      { $set: { isBlocked: false, notes: null } }
    );

    res.status(200).json({ msg: "Dates unblocked successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = { checkAvailability, getAvailability, setAvailability, bulkSetAvailability, blockDates, unblockDates };

