const User = require('../models/User');
const Balance = require("../models/Balance");
const autoVerifyEmail = async (req, res) => {
    try {
        // Find the user with the provided email
        const user = await User.findOne({ where: { email: req.params.email } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the provided token matches the token in the database
        if (user.emailVerificationToken === req.params.token) {
            // If it matches, update the emailVerified field to true
            user.emailVerified = true;
            await user.save();
            res.redirect('/payment');
        } else {
            res.status(400).json({ message: `Invalid verification token for ${user.email}` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error verifying email' });
    }
}

module.exports = { verifyEmail, autoVerifyEmail }
