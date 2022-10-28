// importing xpress authenticate middleware and BlogControllers
const express = require('express');
const {
    createNewblog,
    getAllBlogs,
    updateBlogs,
    deleteBlogs,
    getBlogbyUser,
} = require('../controllers/blogController');
const { authenticate } = require('../middleware/authenticateUser');

const blogRoute = express.Router();

blogRoute.post('/createblog', authenticate, createNewblog);

blogRoute.get('/blogs', getAllBlogs);

blogRoute.route('/editblog').put(updateBlogs).delete(deleteBlogs);

module.exports = blogRoute;
