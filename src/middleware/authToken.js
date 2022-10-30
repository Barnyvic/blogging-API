const jwt = require('jsonwebtoken');

const getTokenFrom = (Token) => {
    const token = Token;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' });
    } else {
        return decodedToken.id;
    }
};

module.exports = getTokenFrom;
