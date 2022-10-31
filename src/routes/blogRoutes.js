// importing xpress authenticate middleware and BlogControllers
const express = require('express');
const {
    createNewblog,
    getAllBlogs,
    getSingleBlog,
    deleteBlogByUser,
    upadetBlogbyUser,
} = require('../controllers/blogController');
const { authenticate } = require('../middleware/authenticateUser');

const blogRoute = express.Router();

blogRoute.post('/createarticle', authenticate, createNewblog);

blogRoute.get('/article', getAllBlogs);

blogRoute.get('/article/:id', getSingleBlog);

blogRoute.put('/editarticle/:id', upadetBlogbyUser);

blogRoute.delete('/deletearticle/:id', deleteBlogByUser);

module.exports = blogRoute;
