const mongoose = require('mongoose');
const Workout = require('../models/WorkoutModel')
const { workoutName } = require('../seeds/seedHelpers')

mongoose.connect('mongodb://127.0.0.1:27017/mern-app')

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
});
const sample = (array) => {
    return array[Math.floor(Math.random() * array.length)]
};

const seedDB = async () => {
    await Workout.deleteMany({});
    for (let i = 0; i < 10; i++) {
        const reps = Math.floor(Math.random() * 30) + 10;
        const load = Math.floor(Math.random() * 20) + 10;
        const workout = new Workout({
            title: `${sample(workoutName)}`,
            reps: reps,
            load: load,
        })
        await workout.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})