const UserModel = require('../Model/UserModel');
const Jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticate = async (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token)
        return res.status(403).send({
            message: 'No token, authorization denied',
        });

    // verify token
    if (token) {
        const user = Jwt.verify(token, process.env.JWT_SECRET);
        req.user = await UserModel.findById(user.id);
        next();
    } else {
        res.clearCookie('accessToken');
        res.status(400).json({ msg: 'Token is not valid' });
    }
};

module.exports = { authenticate };
