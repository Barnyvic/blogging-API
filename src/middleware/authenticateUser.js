const UserModel = require('../Model/UserModel');
const Jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticate = async (req, res, next) => {
    const token = req.cookie.token;

    // if token doesnt exist
    if (!token)
        return res.sendStatus(401).send({
            message: 'No token, authorization denied',
        });

    try {
        // verify token
        const user = Jwt.verify(token, process.env.JWT_SECRET);
        req.user = await UserModel.findById(user);
        next();
    } catch (error) {
        res.clearCookie('token');
        res.status(400).json({ msg: 'Token is not valid' });
    }
};

module.exports = { authenticate };
