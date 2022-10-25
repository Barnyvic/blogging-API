const express = require('express');
const passport = require('passport');

// importing the user Controller
const { CreateUser } = require('../controllers/UserController');

const UserRouter = express.Router();

UserRouter.post(
    '/signup',
    passport.authenticate('signup', { session: false }),
    CreateUser
);

module.exports = UserRouter;
