const express = require('express');
const activityController = require('../controller/activitycontroller');
const userController = require('../controller/usercontroller');
const goalController = require('../controller/goalController')
const router = express.Router();
const checkAuth = require('../middleware/auth');






//user
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);










//activityroutes

router.post('/activities', checkAuth, activityController.createActivity);
router.get('/activities', checkAuth, activityController.getActivities);
router.get('/activities/:id', checkAuth, activityController.getActivityById);
router.delete('/activities/:id', checkAuth, activityController.deleteActivity);





//add new goals

router.get('/goals',checkAuth, goalController.getGoal);
router.post('/goals', checkAuth, goalController.createOrUpdateGoal);








module.exports = router;