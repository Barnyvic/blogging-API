// importing dependencies
const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

// Importing Routes, authenticate,errorMiddleware and Database
const { dbConnection } = require('./database/dbConfig');
const registerationRoute = require('./routes/RegisterRoute');
const { errorHandler } = require('./middleware/errorHandler');
const { authenticate } = require('./middleware/authenticateUser');

const Port = process.env.PORT || 4005;

const app = express();
dbConnection();

// setting views engine
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan('dev'));

// middleware for the Routes
app.use('/', registerationRoute);

// handling errrors
app.use(errorHandler);

app.listen(Port, () => {
    console.log(`Application running on ${Port}`);
});

module.exports = { app };
