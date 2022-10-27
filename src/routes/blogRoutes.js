const express = require('express');

const blogRoute = express.Router();

blogRoute.get('/', (req, res) => {
    res.send('hello world');
});

module.exports = blogRoute;
