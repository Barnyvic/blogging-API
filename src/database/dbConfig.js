/* eslint-disable operator-linebreak */
const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async () => {
    const mongodbURL =
        process.env.NODE_ENV === 'test'
            ? process.env.TEST_MONGODB_URI
            : process.env.MONGODB_URI;

    mongoose.connect(mongodbURL);

    mongoose.connection.on('connected', () => {
        console.log('MONGODB CONNECTED SUCCESSFULLY!...');
    });

    mongoose.connection.on('error', (err) => {
        console.log('An error occurred while connecting to MongoDB');
        console.log(err);
    });
};

module.exports = { dbConnection };
