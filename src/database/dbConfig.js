/* eslint-disable operator-linebreak */
const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async (url) => {
    mongoose.connect(url || 'mongodb://localhost:27017/blogDatabase');

    mongoose.connection.on('connected', () => {
        console.log('MONGODB CONNECTED SUCCESSFULLY!...');
    });

    mongoose.connection.on('error', (err) => {
        console.log('An error occurred while connecting to MongoDB');
        console.log(err);
    });
};

module.exports = { dbConnection };
