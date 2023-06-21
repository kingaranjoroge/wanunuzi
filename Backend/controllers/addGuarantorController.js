const User = require('../models/User');

const addGuarantor = async (req,res) => {
    try {
        // Get the guarantor from the database
        const guarantor = await User.findOne({ where: { id: req.body.guarantorID } });
        // Get the user from the database
        const user = await User.findOne({ where: { id: req.body.userId } });

        // If the guarantor doesn't exist, return an error
        if (!guarantor) {
            return res.status(404).json({ message: 'Guarantor not found' });
        }

        // if the guarantor email is null, return an error
        if(!guarantor.email) {
            console.log('Guarantor email is null');
            return res.status(404).json({ message: 'Guarantor email is not provided' });
        }

        // No email will be sent here as the functionality has been removed
        return res.status(200).json({ message: 'Guarantor added successfully' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { addGuarantor }
