const jwt = require("jsonwebtoken");
const {secret} = require("../config/config");

function auth(req, res, next) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({errorMessage: "Unauthorized."});
        }

        const verified = jwt.verify(token, secret);

        req.user = verified.userId;

        next();
    } catch (err) {
        res.status(401).json({errorMessage: "Unauthorized."});
    }
}

module.exports = auth;