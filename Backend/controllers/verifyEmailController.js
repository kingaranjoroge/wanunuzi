const User = require('../models/User');

const verifyEmail = async (req, res) => {
    try {
        // Find the user with the provided email
        const user = await User.findOne({ where: { email: req.body.email } });
    
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        // Check if the provided token matches the token in the database
        if (user.emailVerificationToken === req.body.token) {
          // If it matches, update the emailVerified field to true
          user.emailVerified = true;
          await user.save();
          res.status(200).json({ message: 'Email verified successfully' });
        } else {
          res.status(400).json({ message: `Invalid verification token for ${user.email}` });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error verifying email' });
      }
}

module.exports = { verifyEmail }