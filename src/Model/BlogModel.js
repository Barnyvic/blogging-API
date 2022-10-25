const mongoose = require('mongoose');

const { Schema } = mongoose;

const BlogSchema = new Schema(
    {
        Title: {
            type: String,
            require: true,
            unique: true,
        },
        Description: { type: String },
        Author: { type: String },
        State: { type: String },
        Read_Count: { type: Number },
        Reading_Time: { type: Date },
        Tags: { type: String },
        Body: { type: String, require: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model('BLOG', BlogSchema);
