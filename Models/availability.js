const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const availabilitySchema = new Schema({
  resourceType: {
    type: String,
    enum: ['hotel', 'activity'],
    required: true
  },
  resourceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'resourceType'
  },
  date: {
    type: Date,
    required: true
  },
  // For hotels
  roomsAvailable: {
    type: Number,
    default: 0
  },
  totalRooms: {
    type: Number,
    default: 0
  },
  // For activities
  spotsAvailable: {
    type: Number,
    default: 0
  },
  totalSpots: {
    type: Number,
    default: 0
  },
  // Time slots for activities
  timeSlots: [
    {
      startTime: { type: String },
      endTime: { type: String },
      available: { type: Number, default: 0 },
      booked: { type: Number, default: 0 }
    }
  ],
  priceModifier: {
    type: Number,
    default: 1.0 // 1.0 = normal price, 1.5 = 50% increase, etc.
  },
  isBlocked: {
    type: Boolean,
    default: false
  },
  notes: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Compound index for efficient queries
availabilitySchema.index({ resourceType: 1, resourceId: 1, date: 1 }, { unique: true });

availabilitySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Static method to check availability for a date range
availabilitySchema.statics.checkAvailability = async function(resourceType, resourceId, startDate, endDate) {
  const availabilities = await this.find({
    resourceType,
    resourceId,
    date: { $gte: new Date(startDate), $lte: new Date(endDate) },
    isBlocked: false
  });
  
  return availabilities;
};

// Static method to block dates
availabilitySchema.statics.blockDates = async function(resourceType, resourceId, startDate, endDate, reason) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const updates = [];
  
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    updates.push({
      updateOne: {
        filter: { resourceType, resourceId, date: new Date(d) },
        update: { $set: { isBlocked: true, notes: reason } },
        upsert: true
      }
    });
  }
  
  return this.bulkWrite(updates);
};

const Availability = mongoose.model("Availability", availabilitySchema);
module.exports = Availability;

