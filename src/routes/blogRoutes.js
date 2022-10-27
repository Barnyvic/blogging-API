// importing xpress authenticate middleware and BlogControllers
const express = require('express');
const {
    createNewblog,
    getAllBlogs,
    updateBlogs,
    deleteBlogs,
    getBlogsbyUser,
} = require('../controllers/blogController');
const { authenticate } = require('../middleware/authenticateUser');

const blogRoute = express.Router();

blogRoute.post('/createblog', authenticate, createNewblog);

blogRoute.get('/posts', getAllBlogs);

blogRoute.route('/editblog').put(updateBlogs).delete(deleteBlogs);

module.exports = blogRoute;
