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

blogRoute
    .route('/:articlesid')
    .get(getSingleBlog)
    .put(upadetBlogbyUser)
    .delete(deleteBlogByUser);

blogRoute.route('/article/userarticle').get(userBlogs);

module.exports = blogRoute;
