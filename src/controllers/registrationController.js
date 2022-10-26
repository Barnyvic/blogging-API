const UserModel = require('../Model/UserModel');
const Jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const registerUser = async (req, res) => {
    const { email, password, firstname, lastname, username, confirmPassword } =
        req.body;

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

    if (password !== confirmPassword) {
        return res.send({ message: 'PassWord must Match' });
    }

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
        console.log(error);
        res.status(500).send({
            message: error.message,
        });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(500)
            .send({ message: 'Pls Complete the required fields' });
    }

    try {
        const User = await UserModel.findOne({ Email: email });

        if (!User) {
            return res.status(409).send({ message: 'User not found' });
        }

        if (User) {
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

            return res
                .cookie('token', token, {
                    httpOnly: true,
                })
                .status(200)
                .send({ message: 'Login successful' });
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = { registerUser, loginUser };
