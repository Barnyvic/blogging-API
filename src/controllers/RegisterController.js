const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../Model/UserModel');
require('dotenv').config();

const signUpUser = async (req, res) => {
    res.json({
        message: 'SignUp Successful',
        user: req.user,
    });
};

const signInUser = async (req, res) => {
    const { email, password } = req.body;
    if (!(email && password)) {
        return res
            .status(500)
            .send({ message: 'Password and Email is required' });
    }

    try {
        const User = await UserModel.findOne({ Email: email });
        if (!User) {
            return res
                .status(409)
                .send({ message: 'User Not Found Pls Register' });
        }

        if (User && (await bcrypt.compare(password, User?.Password))) {
            if (!User.Password) {
                return res.send({ message: 'Invalid Password' });
            }
            const token = jwt.sign(
                { id: User.id, email: User.Email },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            return res.send({ token });
        }
    } catch (error) {
        console.log(error);
    }
};

// const validatePassword = async (password, User) => {
//     await bcrypt.compare(password, User.Password);
// };

module.exports = { signUpUser, signInUser };
