// importing  blog model from model
const blogModel = require('../Model/BlogModel');

const createNewblog = async (req, res, next) => {
    const { title, description, author, body, tags } = req.body;

    if (!title || !description || !author || !body || !tags) {
        return res.status(400).send({ message: 'Fill empty fields' });
    }

    try {
        // sending the created object to database
        const newPost = await blogModel.create({
            Title: title,
            Description: description,
            Author: author,
            Body: body,
            Tags: tags,
        });
        res.status(201).send({ message: 'Blog created Succesfully ' });
    } catch (error) {
        next(error);
    }
};

const getAllBlogs = async (req, res, next) => {
    try {
        // getting al blogs from the database
        const allBlogs = await blogModel.find();

        //filter state === 'published'

        const blogs = allBlogs.filter((blog) => blog.State === 'published');

        if (blogs) {
            res.status(200).send(blogs);
        } else {
            res.status(404).send({ message: 'No Blog Found' });
        }
    } catch (error) {
        next(error);
    }
};

const getBlogbyUser = async (req, res, next) => {
    // query params
    const id = req.params.id;

    try {
        // getting single blog by id
        const Singleblog = await blogModel.findById({ _id: id });

        // filter state === 'published'
        const blog = Singleblog.filter((b) => b.State === 'published');

        if (blog) {
            res.status(200).send({ Blog: blog });
        } else {
            res.status(404).send({ message: 'No Blog Found' });
        }
    } catch (error) {
        next(error);
    }
};

const updateBlogs = async (req, res, next) => {};

const deleteBlogs = async (req, res, next) => {};

module.exports = {
    createNewblog,
    getAllBlogs,
    updateBlogs,
    deleteBlogs,
    getBlogbyUser,
};
