// File: controller/goalController.js

const Goal = require('../modal/goal');

// --- GET /api/goals (Get User's Goal) ---
exports.getGoal = async (req, res) => {
  try {
    // Find the goal document associated with the logged-in user
    const goal = await Goal.findOne({ userId: req.user.id });

    if (!goal) {
      // This isn't an error, it just means the user hasn't set goals yet.
      // We send null so the frontend can handle it.
      return res.status(200).json(null);
    }
    
    res.status(200).json(goal);

  } catch (err) {
    console.error('Error getting goal:', err);
    res.status(500).json({ message: 'Server error retrieving goals.' });
  }
};


// --- POST /api/goals (Create or Update Goal) ---
exports.createOrUpdateGoal = async (req, res) => {
  try {
    const { dailyCalories, weeklyWorkouts } = req.body;
    const userId = req.user.id; // From checkAuth middleware

    // Find a goal by userId and update it.
    // If it doesn't exist, create it (thanks to 'upsert: true').
    const updatedGoal = await Goal.findOneAndUpdate(
      { userId: userId }, // Find document by this query
      { 
        userId: userId, 
        dailyCalories: dailyCalories, 
        weeklyWorkouts: weeklyWorkouts 
      }, // Data to set or update
      { 
        new: true,          // Return the new/updated document
        upsert: true,       // Create the document if it doesn't exist
        runValidators: true // Run Mongoose schema validators (like 'min: 0')
      }
    );

    res.status(200).json({ message: 'Goals saved successfully', goal: updatedGoal });
    
  } catch (err) {
    // Handle validation errors (e.g., negative numbers)
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    console.error('Error saving goal:', err);
    res.status(500).json({ message: 'Server error saving goals.' });
  }
};