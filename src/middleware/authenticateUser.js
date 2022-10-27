const UserModel = require('../Model/UserModel');
const Jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticate = async (req, res, next) => {
    const token = req.cookies.accessToken;

    try {
        if (!token)
            return res.status(403).send({
                message: 'No token, authorization denied',
            });

        if (token === null || token === undefined) {
            return res.status(403).send({ message: 'no token provided' });
        }

        // verify token
        if (token) {
            const user = Jwt.verify(token, process.env.JWT_SECRET);
            req.user = await UserModel.findById(user.id);
            next();
        } else {
        }
    } catch (error) {
        res.clearCookie('accessToken');
        next(error);
    }
};

module.exports = { authenticate };
