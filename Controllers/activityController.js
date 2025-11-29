const Activity = require("../Models/activity");

// Get all activities with filters
const getActivities = async (req, res) => {
  try {
    const { city, country, type, minPrice, maxPrice, search, date } = req.query;
    let filter = { isActive: true };

    if (city) filter.city = { $regex: city, $options: "i" };
    if (country) filter.country = { $regex: country, $options: "i" };
    if (type) filter.type = type;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    let activities = await Activity.find(filter);

    // Filter by date availability if provided
    if (date) {
      const searchDate = new Date(date);
      activities = activities.filter(activity => 
        activity.schedule.some(slot => 
          new Date(slot.date).toDateString() === searchDate.toDateString() && slot.availableSpots > 0
        )
      );
    }

    res.status(200).json({ count: activities.length, activities });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get single activity
const getActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) return res.status(404).json({ msg: "Activity not found" });
    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Create activity
const createActivity = async (req, res) => {
  try {
    const activityData = req.body;
    if (!activityData) return res.status(400).json({ msg: "No data provided" });
    const newActivity = new Activity(activityData);
    await newActivity.save();
    res.status(201).json({ msg: "Activity created!", activity: newActivity });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Update activity
const updateActivity = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!activity) return res.status(404).json({ msg: "Activity not found" });
    res.status(200).json({ msg: "Activity updated", activity });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Delete activity
const deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) return res.status(404).json({ msg: "Activity not found" });
    res.status(200).json({ msg: "Activity deleted" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Book activity
const bookActivity = async (req, res) => {
  try {
    const { date, participants } = req.body;
    if (!date || !participants) return res.status(400).json({ msg: "date and participants required" });

    const activity = await Activity.findById(req.params.id);
    if (!activity) return res.status(404).json({ msg: "Activity not found" });

    const searchDate = new Date(date);
    const slot = activity.schedule.find(s => new Date(s.date).toDateString() === searchDate.toDateString());

    if (!slot) return res.status(400).json({ msg: "No schedule for this date" });
    if (slot.availableSpots < participants) return res.status(400).json({ msg: "Not enough spots" });

    slot.availableSpots -= participants;
    await activity.save();
    res.status(200).json({ msg: "Booking successful", activity });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Add review
const addActivityReview = async (req, res) => {
  try {
    const { user, rating, comment } = req.body;
    if (!user || rating === undefined) return res.status(400).json({ msg: "user and rating required" });

    const activity = await Activity.findById(req.params.id);
    if (!activity) return res.status(404).json({ msg: "Activity not found" });

    activity.reviews.push({ user, rating: Number(rating), comment });
    const totalRating = activity.reviews.reduce((sum, r) => sum + r.rating, 0);
    activity.rating = totalRating / activity.reviews.length;

    await activity.save();
    res.status(200).json({ msg: "Review added", activity });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = { getActivities, getActivity, createActivity, updateActivity, deleteActivity, bookActivity, addActivityReview };

