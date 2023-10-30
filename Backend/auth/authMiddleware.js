const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.decode(token, process.env.JWT_SECRET)
        req.userId = decoded.userId;
        //console.log('Decoded Id:', decoded.userId);
        next();
    }catch(err) {
            console.log('Error while verifying token:', err);
            res.status(401).json({ msg: 'Token is not valid', err});
        }
    };
