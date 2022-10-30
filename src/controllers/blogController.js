// importing  blog model from model
const blogModel = require('../Model/BlogModel');
const UserModel = require('../Model/UserModel');
const Jwt = require('jsonwebtoken');
require('dotenv').config();

//@desc Create a new Blog
//@route POST /createblog
//@access Private

const createNewblog = async (req, res, next) => {
    const { title, description, author, body, tags } = req.body;

    if (!title || !description || !author || !body || !tags) {
        return res.status(400).send({ message: 'Fill empty fields' });
    }
    try {
        const user = await UserModel.findById(req.user._id);

        // sending the created object to database
        const note = new blogModel({
            Title: title,
            Description: description,
            Author: author,
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
        next(error.message);
    }
};

//@desc get All Blogs
//@route GET /articles
//@access Public

const getAllBlogs = async (req, res, next) => {
    try {
        // getting al blogs from the database
        const allBlogs = await blogModel
            .find({})
            .populate('user', { First_Name: 1, Last_Name: 1, _id: 1 });

        //filter state === 'published'

        // const blogs = allBlogs.filter((blog) => blog.State === 'published');

        if (allBlogs) {
            res.status(200).send(allBlogs);
        } else {
            res.status(404).send({ message: 'No Blog Found' });
        }
    } catch (error) {
        next(error.message);
    }
};

//@desc upadet Blog post by User
//@route GET /editblog
//@access Private

const upadetBlogbyUser = async (req, res, next) => {
    const { State, title } = req.body;
    try {
        const Token = req.cookies.accessToken;
        const user = Jwt.verify(Token, process.env.JWT_SECRET);

        const Note = await blogModel.findById(req.params.id);

        if (user.id === Note.user._id.toString()) {
            const updatedBlog = await blogModel.findByIdAndUpdate(
                { _id: req.params.id },
                { $set: { State: State, Title: title } },
                {
                    new: true,
                }
            );

            res.status(200).send(updatedBlog);
        } else {
            res.status(401).send({ message: 'You cant access this resourece' });
        }
    } catch (error) {
        next(error);
    }
};

const updateBlogs = async (req, res, next) => {};

const deleteBlogs = async (req, res, next) => {};

// calculating the total time to read the book
const readingTime = (body) => {
    const wpm = 225;
    const text = body.trim().split(/\s+/).length;
    const time = Math.ceil(text / wpm);
    return `${time}mins`;
};

const getTokenFrom = (Token) => {
    const token = Token;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    console.log(process.env.SECRET);
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' });
    } else {
        return decodedToken.id;
    }
};

module.exports = {
    createNewblog,
    getAllBlogs,
    updateBlogs,
    deleteBlogs,
    upadetBlogbyUser,
};
