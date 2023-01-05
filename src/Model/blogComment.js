const mongoose = require('mongoose');

const { Schema, Types } = mongoose;

const Comment = new Schema(
    {
        Comment: String,
        blogId: { type: Types.ObjectId, ref: 'BLOG' },
        userId: { type: Types.ObjectId, ref: 'Users' },
        userName: { type: String, require: true },
    },
    { timestamps: true }
);

const COMMENT = mongoose.model('COMMENT', Comment);

module.exports = COMMENT;
