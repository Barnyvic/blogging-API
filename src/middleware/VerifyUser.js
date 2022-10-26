const UserModel = require('../Model/UserModel');
const Jwt = require('jsonwebtoken');
require('dotenv').config();

export const verifyToken = async (req, res, next) => {
    const token = req.cookie.token;

    if (!token)
        return res.sendStatus(401).send({
            message: 'Oops Sorry You have to login before continuing....',
        });

    try {
        const user = Jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
        });
    } catch (error) {
        res.clearCookie('token');
    }
};
