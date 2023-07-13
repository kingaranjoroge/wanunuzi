const { User, Role,Loan,Guarantor } = require('../models/initialize');
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

// A method to check if the user is an admin
adminController.isAdmin = async (req, res) => {
    try {
        const user = await User.findOne({
            where: { id: req.userId },
            include: Role,
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Instead of sending an error if the user is not an admin, we send a response
        // indicating whether the user is an admin or not
        const isAdmin = user.Role.name === 'admin';
        res.json({ isAdmin });
    } catch (error) {
        console.error(error);
        if (error instanceof Sequelize.ValidationError) {
            res.status(500).json({ message: 'Some sequelize error occurred', error: error.message });
        } else {
            res.status(500).json({ message: 'An error occurred', error: error.message });
        }
    }
};

// Function to get all loans and their associated user data
adminController.getAllLoans = async (req, res) => {
    try {
        const loans = await Loan.findAll({
            include: [
                { model: User},
                { model: Guarantor, include: { model: User }}
            ],
        });

        res.json({ loans });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

adminController.getLoan = async (req, res) => {
    try {
        const loan = await Loan.findOne({
            where: { id: req.params.id },
            include: [
                { model: User},
                { model: Guarantor, include: { model: User } }
            ],
        });

        if (!loan) {
            return res.status(404).json({ message: 'Loan not found' });
        }

        res.json({ loan });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

// Function to update a loan by its ID
adminController.updateLoan = async (req, res) => {
    try {
        const { amount, status } = req.body;

        const loan = await Loan.update(
            { amount, status },
            {
                where: { id: req.params.id },
                returning: true,
                plain: true,
            }
        );

        res.json({ loan: loan[1] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

adminController.someAdminAction = (req, res) => {
    // Perform some action that only an admin can do
    res.json({ message: 'Admin action performed' });
};

module.exports = adminController;
