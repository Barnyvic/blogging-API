// importing  blog model from model
const blogModel = require('../Model/BlogModel');

const createNewblog = async (req, res, next) => {
    const { title, description, author, body, tags } = req.body;

    if (!title || !description || !author || !body || !tags) {
        return res.staus(400).send({ message: 'Fill empty fields' });
    }

    try {
    } catch (error) {}
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
