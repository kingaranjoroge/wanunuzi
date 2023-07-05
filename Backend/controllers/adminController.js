const { User, Role } = require('../models/initialize');
const {Sequelize} = require("sequelize");

const adminController = {};

// Middleware to check if the user is an admin
// Middleware to check if the user is an admin
adminController.checkAdminRole = async (req, res, next) => {
    try {
        console.log('User Id:', req.userId);

        const user = await User.findOne({
            where: { id: req.userId },
            include: Role,
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.Role.name !== 'admin') {
            return res.status(403).json({ message: 'User is not an admin' });
        }
        // User is an admin, pass control to next middleware
        next();
    } catch (error) {
        console.error(error);
        if (error instanceof Sequelize.ValidationError) {
            // Handle specific error types
            res.status(500).json({ message: 'Some sequelize error occurred', error: error.message });
        } else {
            // Handle generic errors
            res.status(500).json({ message: 'An error occurred', error: error.message });
        }
    }
};


adminController.someAdminAction = (req, res) => {
    // Perform some action that only an admin can do
    res.json({ message: 'Admin action performed' });
};

module.exports = adminController;
