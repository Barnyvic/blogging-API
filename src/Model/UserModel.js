/* eslint-disable no-useless-escape */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Shema = mongoose.Schema;

const UserSchema = new Shema(
    {
        First_Name: {
            type: String,
            required: true,
        },
        Last_Name: {
            type: String,
            required: true,
        },
        Email: {
            type: String,
            unique: true,
            require: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid E-mail',
            ],
        },
        Password: {
            type: String,
            required: true,
            minlength: [6, 'Password must be at least 6 characters long'],
        },
    },
    { timestamps: true }
);
UserSchema.pre('save', async () => {
    const user = this;
    const hash = await bcrypt.hash(user.Password, 10);
    this.Password = hash;
});

module.exports = mongoose.model('USERS', UserSchema);
