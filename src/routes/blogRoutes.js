// importing xpress authenticate middleware and BlogControllers
const express = require('express');
const {
    createNewblog,
    getAllBlogs,
    getSingleBlog,
    deleteBlogByUser,
    updateBlogbyUser,
    userBlogs,
    likeBlogPost,
    uploadBlogImage,
} = require('../controllers/blogController');

const { authenticate } = require('../middleware/authenticateUser');
const upLoad = require('../middleware/cloudinary');
const { createComment, deleteComment } = require('../controllers/blogComment');

const blogRoute = express.Router();

blogRoute.route('/').post(authenticate, createNewblog).get(getAllBlogs);

blogRoute.route('/userarticle').get(authenticate, userBlogs);

blogRoute
    .route('/:id')
    .get(getSingleBlog)
    .put(authenticate, updateBlogbyUser)
    .delete(authenticate, deleteBlogByUser)
    .post(authenticate, createComment);

blogRoute.route('/like/:id').patch(authenticate, likeBlogPost);
blogRoute
    .route('/upload/:id')
    .patch(authenticate, upLoad.single('image'), uploadBlogImage);

blogRoute.route('/deletecomment/:id').delete(authenticate, deleteComment);

module.exports = blogRoute;
