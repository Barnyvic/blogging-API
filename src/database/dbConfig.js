/* eslint-disable operator-linebreak */
const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async () => {
    const url =
        process.env.MONGODB_URL || 'mongodb://localhost:27017/blogDatabase';
    try {
        await mongoose.connect(url);
        console.log('MONGODB CONNECTED SUCCESSFULLY!....');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = dbConnection;
