const mongoose = require('mongoose');

const fitnessSchema = new mongoose.Schema({
  activityName: {
    type: String,
    required: true,
    trim: true,
  },
  duration: {
    type: Number, // in minutes
    required: true,
    min: [1, 'Duration must be at least 1 minute'],
  },
  caloriesBurned: {
    type: Number,
    required: true,
    min: [0, 'Calories burned cannot be negative'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Fitness', fitnessSchema);