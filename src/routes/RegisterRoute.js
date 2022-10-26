const express = require('express');
const registerationRoute = express.Router();
const { registerUser } = require('../controllers/registrationController');

registerationRoute.post('/signup', registerUser);

module.exports = registerationRoute;
