const JWT = require("jsonwebtoken");

const generateToken = (payload) => {
    return JWT.sign(
        {
            data: payload,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_DURATION}
    );
};

const verifyToken =(token) => {
    return JWT.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken,verifyToken};