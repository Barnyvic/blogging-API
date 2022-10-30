const UserModel = require('../Model/UserModel');
const Jwt = require('jsonwebtoken');
const { validPassword } = require('../utilies/comparepassword');
require('dotenv').config();

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
        return res.staus(400).send({ message: 'Fill empty fields' });
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

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .send({ message: 'Pls Complete the required fields' });
        }

        const user = await UserModel.findOne({ email });

        if (!user)
            return res.status(409).send({ message: 'Wrong credentials!' });

        const validatePassword = await validPassword(password, user.Password);
        if (!validatePassword)
            return res.status(401).send({ message: 'Invalid password' });

        let payload = {
            id: user._id,
            username: user.Username,
        };
        const token = Jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        // parsing the token to a cookie
        res.cookie('accessToken', token, {
            httpOnly: true,
        })
            .status(200)
            .send({
                token,
                Email: user.Email,
                Name: `${user.First_Name} ${user.Last_Name}`,
            });
    } catch (error) {
        next(error);
    }
};

module.exports = { registerUser, loginUser };
