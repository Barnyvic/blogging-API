// importing dependencies
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// Importing Routes, authenticate,errorMiddleware and Database
const { dbConnection } = require('./database/dbConfig');
const registerationRoute = require('./routes/RegisterRoute');
const blogRoute = require('./routes/blogRoutes');
const { errorHandler } = require('./middleware/errorHandler');

const Port = process.env.PORT || 4005;

const app = express();
dbConnection();

// setting views engine
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan('dev'));
app.use(cookieParser());

// middleware for the Routes
app.use('/', registerationRoute);
app.use('/blog', blogRoute);

// routes not available
app.all('*', (req, res) => {
    const err = new Error(`Can't find ${req.originalUrl} on this server!`);
    err.status = 404;
    err.statusCode = 404;
    res.send({ message: err.message });
});

// handling errrors
app.use(errorHandler);

app.listen(Port, () => {
    console.log(`Application running on ${Port}`);
});

module.exports = { app };
