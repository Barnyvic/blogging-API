const mongoose = require('mongoose');

const { Schema } = mongoose;

const BlogSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
        },
        Title: {
            type: String,
            require: true,
            unique: true,
        },
        Description: { type: String, require: true },
        Author: { type: String, require: true },
        State: { type: String, default: 'draft', enum: ['draft', 'published'] },
        Read_Count: { type: Number, default: 0 },
        Reading_Time: { type: String },
        Tags: { type: [String] },
        Body: { type: String, require: true },
        likes: { type: [String], default: [] },
        image: { type: String, required: false },
        Comment: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'COMMENT',
        },
    },
    { timestamps: true }
);

const blogModel = mongoose.model('BLOG', BlogSchema);

module.exports = blogModel;
