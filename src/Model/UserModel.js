/* eslint-disable no-useless-escape */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
    {
        First_Name: {
            type: String,
            required: 'First Name is required',
        },
        Last_Name: {
            type: String,
            required: 'Last Name is required',
        },
        Email: {
            type: String,
            unique: true,
            required: 'Email is required',
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid E-mail',
            ],
        },
        Username: {
            type: String,
            unique: true,
            required: 'UserName is required',
        },
        Password: {
            type: String,
            required: 'Password is required',
            minlength: [6, 'Password must be at least 6 characters long'],
        },
        article: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'blogs',
            },
        ],
    },
    { timestamps: true }
);
UserSchema.pre('save', async function (next) {
    const user = this;
    const hash = await bcrypt.hash(user.Password, 12);

    this.Password = hash;
    next();
});

module.exports = mongoose.model('Users', UserSchema);
