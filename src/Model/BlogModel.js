const mongoose = require('mongoose');

const { Schema } = mongoose;

const BlogSchema = new Schema(
    {
        Title: {
            type: String,
            require: true,
            unique: true,
        },
        Description: { type: String, require: true },
        Author: { type: String, require: true },
        State: { type: String, default: 'draft', enum: ['draft', 'published'] },
        Read_Count: { type: Number },
        Reading_Time: { type: Number },
        Tags: { type: String },
        Body: { type: String, require: true },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'USERS',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('BLOG', BlogSchema);
