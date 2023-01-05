const blogModel = require('../Model/BlogModel');
const COMMENT = require('../Model/blogComment');
const UserModel = require('../Model/UserModel');

// create  a new blog comment

const createComment = async (req, res, next) => {
    try {
        const { Text } = req.body;

        if (!Text)
            return res.status(400).send({ message: 'Fill empty fields' });

        const user = await UserModel.findById(req.user._id);
        const blog = await blogModel.findById(req.params.id);
        if (!blog) {
            return res.status(404).send({ message: 'Blog not found' });
        }

        const comment = new COMMENT({
            Comment: Text,
            blogId: blog.id,
            userId: user.id,
            userName: `${user.First_Name} ${user.Last_Name}`,
        });

        const savedComment = await comment.save();

        // saving the comment id in blog shema
        blog.Comment = blog.Comment.concat(savedComment._id);
        await blog.save();

        res.status(201).send(savedComment);
    } catch (error) {
        next(error);
    }
};

const deleteComment = async (req, res, next) => {
    try {
        const user = req.user;
        const comment = await COMMENT.findById(req.params.id);

        if (user.id === comment.userId.toString()) {
            await COMMENT.findByIdAndDelete(req.params.id);
            const blog = await blogModel.findById(comment.blogId);

            const index = blog.Comment.indexOf(req.params.id);
            if (index !== -1) {
                blog.Comment.splice(index, 1);
                await blog.save();
                res.status(204).send({ message: 'Deleted successfully' });
            }
        }
    } catch (error) {
        next(error);
    }
};

module.exports = { createComment, deleteComment };
