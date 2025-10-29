// File: modal/goal.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const goalSchema = new Schema({
  // This links the goal to a specific user
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true // Ensures one goal document per user
  },
  dailyCalories: {
    type: Number,
    required: true,
    min: 0,
    default: 2000 // A sensible default
  },
  weeklyWorkouts: {
    type: Number,
    required: true,
    min: 0,
    default: 3 // A sensible default
  }
}, { 
  // Adds createdAt and updatedAt timestamps
  timestamps: true 
});

module.exports = mongoose.model('Goal', goalSchema);