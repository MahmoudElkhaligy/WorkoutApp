require('dotenv').config()

const express = require("express");
var cors = require("cors");
const mongoose = require("mongoose");
// const flash = require('connect-flash');
const workoutRoutes = require('./routes/workoutsRoutes')
const userRoutes = require('./routes/userRoutes')

// Database selection
const LocalDbUrl = 'mongodb://127.0.0.1:27017/mern-app'
const dbURI = process.env.MONGO_URI;

const app = express();

app.use(cors());



app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})


// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)




// connect to database
mongoose.connect(LocalDbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
    app.listen(process.env.PORT, () => {
        console.log('Listening on port 4000');
    })
})