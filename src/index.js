// importing dependencies
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// Importing Routes, authenticate anderrorMiddleware

const registerationRoute = require('./routes/RegisterRoute');
const blogRoute = require('./routes/blogRoutes');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

// setting views engine
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan('dev'));
app.use(cookieParser());

// middleware for the Routes
app.use('/auth', registerationRoute);
app.use('/articles', blogRoute);

app.get('/', (req, res) => {
    res.status(200).send({ message: ' Welcome to the blog!' });
});

// routes not found
app.use('*', (req, res) => {
    return res.status(404).json({ message: 'route not found' });
});

// handling errrors
app.use(errorHandler);

module.exports = app;
