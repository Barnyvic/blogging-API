/* eslint-disable indent */
const express = require('express');
require('dotenv').config();

const dbConnection = require('./database/dbConfig');

const Port = process.env.PORT || 4005;

const app = express();
dbConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(Port, () => {
    console.log(`Application running on ${Port}`);
});
