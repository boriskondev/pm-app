function requireAuth(req, res, next) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({errorMessage: "Unauthorized."});
        }

        next();
    } catch (err) {
        res.status(401).json({errorMessage: "Unauthorized."});
    }
}

module.exports = requireAuth;