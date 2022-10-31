const express = require('express');
const registerationRoute = express.Router();
const {
    registerUser,
    login,
} = require('../controllers/registrationController');

registerationRoute.post('/register', registerUser);
registerationRoute.post('/login', login);

module.exports = registerationRoute;
