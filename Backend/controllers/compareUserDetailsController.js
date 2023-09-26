const User = require('../models/User')

const compareUserDetails = async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Fetch the user details from the User model using the userId
      const user = await User.findOne({
        where: {
          id: userId
        }
      });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Create an object with the user details
      const userDetails = {
        fullName: user.fullName,
        idNumber: user.idNumber,
        email: user.email,
        phoneNumber: user.phoneNumber,
        kraPin: user.kraPin,
        DOB: user.DOB,
        Gender: user.Gender,
        Status: user.Status,
        Address: user.Address
      };
  
      // Send the user details as a response
      res.status(200).json({ message: 'User details retrieved successfully', data: { user: userDetails } });

    } catch (error) {
      console.error('Error comparing user details:', error);
      res.status(500).json({ message: 'Failed to compare user details', error: error.message });
    }
  };
  
  module.exports = { compareUserDetails };