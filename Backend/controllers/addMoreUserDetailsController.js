const User = require('../models/User');

const moreUserDetails = async (req, res) => {
  try {
    const userData = req.body;

    // Check if the columns DOB, Gender, Status, Address, and kraPin are null
    const user = await User.findOne({
      where: {
        DOB: null,
        Gender: null,
        Status: null,
        Address: null,
        kraPin: null,
      },
    });

    if (user) {
      // Prepare the updated user details
      const updatedUserDetails = {
        DOB: userData.dob,
        Gender: userData.gender,
        Status: userData.status,
        Address: userData.address,
        kraPin: userData.kraPin,
      };

      // Update the user's details with the values from updatedUserDetails
      await User.update(updatedUserDetails, {
        where: {
          id: user.id,
        },
      });

      res.status(200).json({ message: 'User details updated successfully' });
    } else {
      res.status(404).json({ error: 'No user found with null details' });
    }
  } catch (error) {
    console.error('Error updating user details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { moreUserDetails };
