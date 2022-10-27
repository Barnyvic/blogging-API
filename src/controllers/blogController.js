// importing  blog model from model
const blogModel = require('../Model/BlogModel');

const createNewblog = async (req, res, next) => {
    const { title, description, author, body, tags } = req.body;

    if (!title || !description || !author || !body || !tags) {
        return res.status(400).send({ message: 'Fill empty fields' });
    }

    try {
        const newPost = await blogModel.create({
            Title: title,
            Description: description,
            Author: author,
            Body: body,
            Tags: tags,
        });
        res.status(201).send({ message: newPost });
    } catch (error) {
        next(error);
    }
};

const getAllBlogs = async (req, res, next) => {};

const updateBlogs = async (req, res, next) => {};

const deleteBlogs = async (req, res, next) => {};

const getBlogsbyUser = async (req, res, next) => {};

module.exports = {
    createNewblog,
    getAllBlogs,
    updateBlogs,
    deleteBlogs,
    getBlogsbyUser,
};
