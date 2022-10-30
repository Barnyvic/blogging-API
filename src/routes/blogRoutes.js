// importing xpress authenticate middleware and BlogControllers
const express = require('express');
const {
    createNewblog,
    getAllBlogs,
    updateBlogs,
    deleteBlogs,
    upadetBlogbyUser,
} = require('../controllers/blogController');
const { authenticate } = require('../middleware/authenticateUser');

const blogRoute = express.Router();

blogRoute.post('/createblog', authenticate, createNewblog);

blogRoute.get('/articles', getAllBlogs);

blogRoute.put('/editblog/:id', upadetBlogbyUser);

module.exports = blogRoute;
