/* eslint-disable operator-linebreak */
const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async () => {
    const mongodbURL =
        process.env.NODE_ENV === 'test'
            ? process.env.TEST_MONGODB_URI
            : process.env.MONGODB_URI;

    try {
        //connecting to the database
        await mongoose.connect(mongodbURL);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = { dbConnection };
