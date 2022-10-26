const express = require('express');
const passport = require('passport');

// importing the user Controller
const { signUpUser, signInUser } = require('../controllers/RegisterController');

const RegisterRouter = express.Router();

RegisterRouter.post(
    '/signup',
    passport.authenticate('signup', { session: false }),
    signUpUser
);

RegisterRouter.post('/signin', signInUser);

module.exports = RegisterRouter;
