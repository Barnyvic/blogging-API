const express = require('express');
const registerationRoute = express.Router();
const {
    registerUser,
    login,
    logout,
} = require('../controllers/registrationController');

registerationRoute.post('/register', registerUser);
registerationRoute.post('/login', login);
registerationRoute.get('/logout', logout);

module.exports = registerationRoute;
