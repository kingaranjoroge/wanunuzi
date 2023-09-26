const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
    try {
      const user = await User.findOne({ where: { email: req.body.username } });
      if (user && await bcrypt.compare(req.body.password, user.password)) {
        const token = jwt.sign({
          name: user.fullName,  // Corrected field reference
          email: user.email,
          idNumber: user.idNumber,  // Added field reference
          phoneNumber: user.phoneNumber,  // Added field reference
          userId: user.id,
          // Add other user details you might want to include
        }, process.env.JWT_SECRET, {
          expiresIn: '2h' // Token expiration time (optional)
        });
        res.json({ message: 'Logged in successfully', token });
      } else {
        res.status(401).json({ message: 'Invalid username or password' });
      } 
    }
      catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging in' });
      }
  }

  module.exports = { loginUser }