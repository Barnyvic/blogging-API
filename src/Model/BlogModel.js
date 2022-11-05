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
    },
    { timestamps: true }
);

const blogModel = mongoose.model('BLOG', BlogSchema);

module.exports = blogModel;
