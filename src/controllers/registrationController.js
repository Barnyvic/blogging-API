const UserModel = require('../Model/UserModel');
const Jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

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
        return res.send({ message: 'Fill empty fields' });
    }
    //   confirming password
    if (password !== confirmPassword) {
        return res.send({ message: 'PassWord must Match' });
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
        return res.status(201).send({ message: 'User created successfully' });
    } catch (error) {
        next(error.message);
    }
};

const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(500)
            .send({ message: 'Pls Complete the required fields' });
    }

    try {
        const User = await UserModel.findOne({ Email: email });
        // if user is not found in the database
        if (!User) {
            return res.status(409).send({ message: 'User not found' });
        }
        // if user is already in the database
        if (User) {
            // verifing the user password
            const validatePassword = await bcrypt.compare(
                password,
                User.Password
            );
            if (!validatePassword) {
                return res.status(500).send({ message: 'Invalid password' });
            }
            let payload = { id: User._id };
            const token = Jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });
            // parsing the token to a cookie
            return res
                .cookie('token', token, {
                    httpOnly: true,
                })
                .status(200)
                .send({ message: 'Login successful' });
        }
    } catch (error) {
        next(error.message);
    }
};

module.exports = { registerUser, loginUser };
