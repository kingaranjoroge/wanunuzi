const User = require('../models/user');
const Role = require('../models/role');

const adminController = {};

// Middleware to check if the user is an admin
adminController.checkAdminRole = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { id: req.userId }, // Assuming `req.userId` is set earlier in your middleware chain
            include: Role,
        });

        if (user.Role.name !== 'admin') {
            return res.status(403).json({ message: 'User is not an admin' });
        }

        // User is an admin, pass control to next middleware
        next();
    } catch (error) {
        res.status(500).json({ message: 'Error occurred', error });
    }
};

adminController.someAdminAction = (req, res) => {
    // Perform some action that only an admin can do
    res.json({ message: 'Admin action performed' });
};

module.exports = adminController;
