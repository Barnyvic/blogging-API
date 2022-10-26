/* eslint-disable indent */
// importing dependencies
const express = require('express');
require('dotenv').config();

// Importing Routes, authenticate and Database
const dbConnection = require('./database/dbConfig');
const registerationRoute = require('./routes/RegisterRoute');

const Port = process.env.PORT || 4005;

const app = express();
dbConnection();

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// middleware for the Routes
app.use('/', registerationRoute);

app.listen(Port, () => {
    console.log(`Application running on ${Port}`);
});
