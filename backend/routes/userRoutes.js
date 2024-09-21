const express = require('express');
const catchAsync = require('../Utils/catchAsync');

// controller functions
const user = require('../controllers/userController');

const router = express.Router()

// signup route
router.route('/register')
    .post(catchAsync(user.registerUser))


// login route
router.route('/login')
    .post(catchAsync(user.loginUser));

module.exports = router