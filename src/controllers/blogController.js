// importing  blog model from model
const blogModel = require('../Model/BlogModel');
const UserModel = require('../Model/UserModel');

// create a new blog
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
        next(error);
    }
};

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

// calculating the total time to read the book
const readingTime = (body) => {
    const wpm = 225;
    const text = body.trim().split(/\s+/).length;
    const time = Math.ceil(text / wpm);
    return `${time}mins`;
};

module.exports = {
    createNewblog,
    getAllBlogs,
    updateBlogs,
    deleteBlogs,
    getBlogbyUser,
};
