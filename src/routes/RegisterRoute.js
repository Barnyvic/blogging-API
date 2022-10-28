const express = require('express');
const registerationRoute = express.Router();
const {
    registerUser,
    loginUser,
} = require('../controllers/registrationController');

registerationRoute.post('/register', registerUser);
registerationRoute.post('/login', loginUser);

module.exports = registerationRoute;
