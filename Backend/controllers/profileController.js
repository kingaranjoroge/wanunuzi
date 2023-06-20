const User = require('../models/User');

const userProfile = async (req, res) => {
    try {
        const { userId } = req.params;

        // Retrieve user details from the database
        const user = await User.findOne({ where: { id: userId } });

        // If the user doesn't exist, return an error
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Extract the required user details
        const userDetails = {
            name: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            idNumber: user.idNumber
        };

        // Respond with the user details
        res.json(userDetails);
    } catch (error) {
        console.error("Error fetching user details:", error);
        return res.status(500).json({ message: 'Server error' });
    }

}

const updateProfile = async (req, res) => {
    try {
        const { name, email, phoneNumber, idNumber } = req.body;
        const { userId } = req.params;

        // Retrieve user details from the database
        const user = await User.findOne({ where: { id: userId } });

        // If the user doesn't exist, return an error
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user details
        user.fullName = name;
        user.email = email;
        user.phoneNumber = phoneNumber;
        user.idNumber = idNumber;
        await user.save();

        res.json({ message: 'User details updated successfully' });
    } catch (error) {
        console.error("Error updating user details:", error);
        return res.status(500).json({ message: 'Server error' });
    }
}


module.exports = { userProfile, updateProfile }