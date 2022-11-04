// importing  blog model from model
const blogModel = require('../Model/BlogModel');
const UserModel = require('../Model/UserModel');
const Jwt = require('jsonwebtoken');
require('dotenv').config();

//@desc Create a new Blog
//@route POST /
//@access Private

const createNewblog = async (req, res, next) => {
    const { title, description, body, tags } = req.body;

    if (!title || !description || !body || !tags) {
        return res.status(400).send({ message: 'Fill empty fields' });
    }
    try {
        const user = await UserModel.findById(req.user._id);

        // sending the created object to database
        const note = new blogModel({
            Title: title,
            Description: description,
            Author: `${user.First_Name} ${user.Last_Name}`,
            Body: body,
            Tags: tags,
            Reading_Time: readingTime(body),
            user: user._id,
        });

        const savedNote = await note.save();

        // saving the blog id in user shema
        user.article = user.article.concat(savedNote._id);
        await user.save();

        res.status(201).send({ message: 'Blog created Succesfully ' });
    } catch (error) {
        next(error);
    }
};

//@desc get All Blogs
//@route GET /
//@access Public

const getAllBlogs = async (req, res, next) => {
    try {
        //pagination
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 20;

        // search by title, author and tags
        let search = {};
        if (req.query.author) {
            search = { Author: req.query.author };
        } else if (req.query.title) {
            search = { Title: req.query.title };
        } else if (req.query.tag) {
            search = { Tags: req.query.tag };
        }

        // getting al blogs from the database
        const blogs = await blogModel
            .find(search)
            .where({ State: 'published' })
            .sort({ Reading_Time: 1, Read_Count: -1, timestamps: -1 })
            .skip(page * limit)
            .limit(limit);

        const count = await blogModel.countDocuments();

        if (blogs) {
            res.status(200).send({
                message: blogs,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
            });
        } else {
            res.status(404).send({ message: 'No Blog Found' });
        }
    } catch (error) {
        next(error);
    }
};

//@desc get a single blog
//@route GET /:id
//@access Public

const getSingleBlog = async (req, res, next) => {
    try {
        const singleBlog = await blogModel
            .findById(req.params.id)
            .where({ State: 'published' })
            .populate('user', { First_Name: 1, Last_Name: 1, Email: 1 });

        if (!singleBlog)
            return res.status(404).send({ message: 'No such blog found' });

        singleBlog.Read_Count++;
        const blog = await singleBlog.save();

        res.status(200).send({ blog: blog });
    } catch (error) {
        next(error);
    }
};

//@desc update Blog post by User
//@route PUT /:id
//@access Private

const upadetBlogbyUser = async (req, res, next) => {
    const { State, title, description, body, tags } = req.body;
    try {
        const user = req.user;

        const blog = await blogModel.findById(req.params.id);

        if (user.id === blog.user._id.toString()) {
            const updatedBlog = await blogModel.findByIdAndUpdate(
                { _id: req.params.id },
                {
                    $set: {
                        State: State,
                        Title: title,
                        Description: description,
                        Body: body,
                        tags: tags,
                    },
                },
                {
                    new: true,
                }
            );

            res.status(200).send(updatedBlog);
        } else {
            res.status(401).send({ message: 'You cant access this resource' });
        }
    } catch (error) {
        next(error);
    }
};

//@desc delete Blog post by User
//@route DELETE /:id
//@access Private
const deleteBlogByUser = async (req, res, next) => {
    try {
        const user = req.user;

        const blog = await blogModel.findById(req.params.id);

        if (user.id === blog.user._id.toString()) {
            await blogModel.findByIdAndDelete(req.params.id);
            const user = await UserModel.findById(req.user._id);

            const index = user.article.indexOf(req.params.id);
            if (index !== -1) {
                user.article.splice(index, 1);
                await user.save();
                res.status(204).send({ message: 'Deleted successfully' });
            }
        } else {
            res.status(401).send({ message: 'You cant access this resource' });
        }
    } catch (error) {
        next(error);
    }
};

//@desc get Blogs post by User
//@route GET /userarticle
//@access Private

const userBlogs = async (req, res, next) => {
    try {
        const user = req.user;

        // implementing pagination
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 10;

        const User = await UserModel.findById(user.id)
            .populate('article')
            .skip(page * limit)
            .limit(limit);
        const count = await UserModel.countDocuments();

        res.status(200).send({
            message: 'Your blog post',
            blogs: User.article,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        });
    } catch (error) {
        next(error);
    }
};

// calculating the total time to read the book
const readingTime = (body) => {
    const wpm = 225;
    const text = body.trim().split(/\s+/).length;
    const time = Math.ceil(text / wpm);
    return `${time} mins`;
};

module.exports = {
    createNewblog,
    getAllBlogs,
    getSingleBlog,
    deleteBlogByUser,
    upadetBlogbyUser,
    userBlogs,
};
