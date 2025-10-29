const Fitness = require('../modal/activity'); 
// Note: req.user.id is securely set by your checkAuth middleware after token verification

// --- POST /api/activities (Create Activity) ---
exports.createActivity = async (req, res) => {
    try {
        // Data extraction from request body
        const { activityName, duration, caloriesBurned, date } = req.body;
        // User ID derived from the verified JWT token
        const userId = req.user.id; 

        if (!activityName || !duration || !caloriesBurned) {
             return res.status(400).json({ message: 'Missing required fields: activityName, duration, and caloriesBurned.' });
        }

        // Create new Fitness document, linking it to the authenticated user (userId)
        const newActivity = new Fitness({ activityName, duration, caloriesBurned, date, userId });
        await newActivity.save();

        res.status(201).json({ message: 'Fitness activity created successfully', activity: newActivity });
        
    } catch (err) {
        console.error('Error creating activity:', err); 
        
        // Handle Mongoose validation errors (e.g., failed minimum duration)
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message });
        }
        
        // Generic server error catch
        res.status(500).json({ message: 'Server error during activity creation.' });
    }
};

// --- GET /api/activities (Get All User Activities) ---
exports.getActivities = async (req, res) => {
    try {
        // Retrieve ONLY activities associated with the logged-in user (req.user.id)
        const activities = await Fitness.find({ userId: req.user.id }).sort({ date: -1 });
        res.status(200).json(activities);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// --- GET /api/activities/:id (Get Single Activity by ID) ---
exports.getActivityById = async (req, res) => {
    try {
        // SECURITY CHECK: Find by ID AND ensure userId matches the authenticated user
        const activity = await Fitness.findOne({ 
            _id: req.params.id, 
            userId: req.user.id 
        });

        if (!activity) {
            return res.status(404).json({ message: 'Activity not found or unauthorized' });
        }
        res.status(200).json(activity);
    } catch (err) {
        // Handle incorrect MongoDB ID format error
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Activity not found or invalid ID format' });
        }
        res.status(500).json({ message: 'Server error retrieving activity.' });
    }
};

// --- DELETE /api/activities/:id (Delete Activity) ---
exports.deleteActivity = async (req, res) => {
    try {
        // SECURITY CHECK: Find and delete by ID AND ensure userId matches the authenticated user
        const activity = await Fitness.findOneAndDelete({ 
            _id: req.params.id, 
            userId: req.user.id 
        });
        
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found or unauthorized' });
        }

        res.status(200).json({ message: 'Activity deleted successfully', deletedId: activity._id });
        
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Activity not found or invalid ID format' });
        }
        res.status(500).json({ message: 'Server error deleting activity.' });
    }
};
