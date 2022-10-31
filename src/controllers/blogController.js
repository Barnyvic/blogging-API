// importing  blog model from model
const blogModel = require('../Model/BlogModel');
const UserModel = require('../Model/UserModel');
const Jwt = require('jsonwebtoken');
require('dotenv').config();

//@desc Create a new Blog
//@route POST /createarticle
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
//@route GET /article
//@access Public

const getAllBlogs = async (req, res, next) => {
    try {
        // getting al blogs from the database
        const allBlogs = await blogModel
            .find({})
            .populate('user', { First_Name: 1, Last_Name: 1, _id: 1 })
            .where({ State: 'published' });

        const blogs = allBlogs.filter((blog) => blog.State === 'published');

        if (blogs) {
            res.status(200).send({ message: blogs });
        } else {
            res.status(404).send({ message: 'No Blog Found' });
        }
    } catch (error) {
        next(error);
    }
};

//@desc get a single blog
//@route GET /article/:id
//@access Public

const getSingleBlog = async (req, res, next) => {
    try {
        const singleBlog = await blogModel
            .findById(req.params.id)
            .where({ State: 'published' });

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
//@route PUT /editarticle/:id
//@access Private

const upadetBlogbyUser = async (req, res, next) => {
    const { State, title, description, body, tags } = req.body;
    try {
        const Token = req.cookies.accessToken;
        const user = Jwt.verify(Token, process.env.JWT_SECRET);

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
//@route DELETE /deletearticle/:id
//@access Private
const deleteBlogByUser = async (req, res, next) => {
    try {
        const Token = req.cookies.accessToken;
        const user = Jwt.verify(Token, process.env.JWT_SECRET);

        const blog = await blogModel.findById(req.params.id);

        if (user.id === blog.user._id.toString()) {
            await blogModel.findByIdAndDelete(req.params.id);
            return res.status(204).send({ message: 'Deleted successfully' });
        } else {
            res.status(401).send({ message: 'You cant access this resource' });
        }
    } catch (error) {
        next(error);
    }
};

//@desc get Blogs post by User
//@route GET /deletearticle/:id
//@access Private

const userBlogs = async (req, res, next) => {
    try {
        const Token = req.cookies.accessToken;
        const user = Jwt.verify(Token, process.env.JWT_SECRET);

        const blogs = await blogModel.find();

        if (user.id !== blogs.user._id.toString())
            return res
                .status(401)
                .send({ message: 'You cant access this resource' });

        if (user.id == blogs.user._id.toString())
            return res.status(200).send({ Blogpost: blogs });
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
};
