const User = require('../models/User');

const verifyEmail = async (req, res) => {
    try {
        const email = req.body.email || req.query.email;
        const token = req.body.token || req.query.token;

        // Find the user with the provided email
        const user = await User.findOne({ where: { email: email } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the provided token matches the token in the database
        if (user.emailVerificationToken === token) {
            // If it matches, update the emailVerified field to true
            user.emailVerified = true;
            await user.save();

            if(req.method === 'GET') {
                res.redirect('/payment'); // Redirect to payment page if the request is GET.
            } else {
                res.status(200).json({ message: 'Email verified successfully' });
            }
        } else {
            res.status(400).json({ message: `Invalid verification token for ${user.email}` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error verifying email' });
    }
};
const verifyEmailGet = async (req, res) => {
    try {
        const { email, token } = req.query;
        const decodedEmail = decodeURIComponent(email); // decode the email

        const user = await User.findOne({ where: { email: decodedEmail } });
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (user.emailVerificationToken === token) {
            user.emailVerified = true;
            await user.save();
            //REDIRECT TO FRONTEND URL  /VERIFICATION-SUCCESS
            res.redirect(`${process.env.FRONTEND_URL}/verification-success`);
        } else {
            //REDIRECT TO FRONTEND URL  /VERIFICATION-FAILURE
            res.redirect(`${process.env.FRONTEND_URL}/verification-failure`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error verifying email' });
    }
}

module.exports = { verifyEmail, verifyEmailGet } // export the new function