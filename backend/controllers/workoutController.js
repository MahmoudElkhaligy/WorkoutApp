const Workout = require('../models/WorkoutModel');
const mongoose = require('mongoose');

//show all workouts
module.exports.getWorkouts = async (req, res) => {
    const owner = req.user._id

    const workouts = await Workout.find({ owner }).sort({ createdAt: -1 })

    res.json(workouts)
}

//Create new workout
module.exports.createWorkout = async (req, res, next) => {
    const { title, load, reps } = req.body

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!load) {
        emptyFields.push('load')
    }
    if (!reps) {
        emptyFields.push('reps')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill all the fields', emptyFields })
    }

    // add workout to db
    try {
        const owner = req.user._id
        const workout = await Workout.create({ title, load, reps, owner })
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

//show single workout
module.exports.getWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' })
    }

    const workout = await Workout.findById(id)
    if (!workout) {
        console.log('nothing');
        return res.status(404).json({ error: 'No such workout' });
    }
    res.json(workout)
}


//delete a workout
module.exports.destroyWorkout = async (req, res) => {
    const { id } = req.params;
    const workout = await Workout.findByIdAndDelete(id);
    if (!workout) {
        return res.status(404).json({ error: 'No such workout' });
    }
    console.log("Deleted!!")
    res.status(200).json(workout)
}

//Update a workout
module.exports.updateWorkout = async (req, res) => {
    const { id } = req.params;

    const workout = await Workout.findOneAndUpdate({ _id: id }, {
        ...req.body
    })
    if (!workout) {
        return res.status(404).json({ error: 'No such workout' });
    }
    res.status(200).json(workout)
}

