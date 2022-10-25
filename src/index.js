/* eslint-disable indent */
// importing dependencies
const express = require('express');
const passport = require('passport');
require('dotenv').config();

// Importing Routes, authenticate and Database
const dbConnection = require('./database/dbConfig');
const UserRouter = require('./routes/usersRoute');
require('./authenticate/authenticate');

const Port = process.env.PORT || 4005;

const app = express();
dbConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// middleware for the Routes
app.use('/auth', UserRouter);

app.listen(Port, () => {
    console.log(`Application running on ${Port}`);
});
