const UserModel = require('../Model/UserModel');
const Jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');

//@desc Register new user
//@route POST /register
//@access Public

const registerUser = async (req, res, next) => {
    const { email, password, firstname, lastname, username, confirmPassword } =
        req.body;
    //    making sure all fields are valid
    if (
        !email ||
        !password ||
        !firstname ||
        !lastname ||
        !username ||
        !confirmPassword
    ) {
        return res.status(400).send({ message: 'Fill empty fields' });
    }
    //   confirming password
    if (password !== confirmPassword) {
        return res.status(400).send({ message: 'PassWord must Match' });
    }

    //   saving to database
    try {
        const user = await UserModel.create({
            Email: email,
            Password: password,
            First_Name: firstname,
            Last_Name: lastname,
            Username: username,
        });
        return res.status(200).send({ message: 'User created successfully' });
    } catch (error) {
        next(error);
    }
};

//@desc Login user
//@route POST /login
//@access Public

const login = async (req, res, next) => {
    const { email, Password } = req.body;

    if (!email || !Password) {
        return res
            .status(400)
            .send({ message: 'Pls Complete the required fields' });
    }

    try {
        const user = await UserModel.findOne({ Email: email });

        if (!user)
            return res.status(409).send({ message: 'Wrong credentials!' });

        const validPassword = await user.validatePassword(Password);

        if (!validPassword)
            return res.status(401).send({ message: 'Invalid password' });

        const payload = {
            id: user._id,
            username: user.Username,
        };

        const token = Jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.EXPIRE,
        });
        res.cookie('accessToken', token, {
            httpOnly: true,
        }).send({
            message: token,
            Email: user.Email,
            Name: `${user.First_Name} ${user.Last_Name}`,
        });
    } catch (error) {
        next(error);
    }
};

const logout = async (req, res) => {
    res.cookie('accessToken', '', { maxAge: 1 });
    res.send('Logged out successfully...');
};

module.exports = { registerUser, login, logout };
