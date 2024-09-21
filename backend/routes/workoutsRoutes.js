const express = require("express");
const workouts = require("../controllers/workoutController")
const catchAsync = require('../Utils/catchAsync');
const isAuth = require('../middleware/isAuth')

const router = express.Router();

// require auth for all workout routes
router.use(isAuth)

router.route('/')
    .get(catchAsync(workouts.getWorkouts))
    .post(catchAsync(workouts.createWorkout))

router.route('/:id')
    .get(catchAsync(workouts.getWorkout))
    .delete(catchAsync(workouts.destroyWorkout))
    .patch(catchAsync(workouts.updateWorkout))

module.exports = router;