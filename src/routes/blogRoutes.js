// importing xpress authenticate middleware and BlogControllers
const express = require('express');
const {
    createNewblog,
    getAllBlogs,
    getSingleBlog,
    deleteBlogByUser,
    upadetBlogbyUser,
    userBlogs,
} = require('../controllers/blogController');

const { authenticate } = require('../middleware/authenticateUser');

const blogRoute = express.Router();

blogRoute.route('/').post(authenticate, createNewblog).get(getAllBlogs);

blogRoute.route('/userarticle').get(authenticate, userBlogs);

blogRoute
    .route('/:id')
    .get(getSingleBlog)
    .put(authenticate, upadetBlogbyUser)
    .delete(authenticate, deleteBlogByUser);

module.exports = blogRoute;
