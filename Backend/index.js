const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Loan = require('./models/Loan');
const cors = require('cors'); // don't forget to install this: npm install cors
const cookieParser = require('cookie-parser');
const sequelize = require('./models/database');
require('dotenv').config(); // don't forget to install this: npm install dotenv

const app = express();

app.use(cors());
app.use(express.json());

app.post('/signup', async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      // Verify that the email is not already in use
      const emailExists = await User.findOne({ where: { email: req.body.email } });
      if (emailExists) {
        return res.status(500).json({ message: 'Email already in use' });
      }
      // Verify that the phone number is not already in use
      const phoneNumberExists = await User.findOne({ where: { phoneNumber: req.body.phoneNumber } });
      if (phoneNumberExists) {
        return res.status(500).json({ message: 'Phone number already in use' });
      }
      // Verify that the ID number is not already in use
      const idNumberExists = await User.findOne({ where: { idNumber: req.body.idNumber } });
      if (idNumberExists) {
        return res.status(500).json({ message: 'ID number already in use' });
      }
  
      const user = await User.create({
        fullName: req.body.fullName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        idNumber: req.body.idNumber,
        password: hashedPassword
      });
  
      // Generate a JWT token for the newly registered user
      const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
        expiresIn: '5m' // Token expiration time (optional)
      });
  
      res.status(201).json({ message: 'User created successfully', token, username: user.username });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating user' });
    }
  });


app.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.username } });
    if (user && await bcrypt.compare(req.body.password, user.password)) {
      const token = jwt.sign({
        name: user.fullName,  // Corrected field reference
        email: user.email,
        idNumber: user.idNumber,  // Added field reference
        phoneNumber: user.phoneNumber,  // Added field reference
        userId: user.id
        // Add other user details you might want to include
      }, process.env.JWT_SECRET, {
        expiresIn: '5m' // Token expiration time (optional)
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
  });


// Handle the payment initiation route
app.post('/payment', async (req, res) => {
  // Retrieve the amount and phone number from the request body
  const { amount, phoneNumber } = req.body;

  try {
    // Make a request to the M-Pesa Daraja API to initiate the payment
    // Include other required parameters for M-Pesa API
    await axios.post('https://api.safaricom.co.ke/payment', {
      amount,
      phoneNumber,
      // ...
    }, {
      headers: {
        // Include necessary headers for authentication
        // ...
      },
    });

    // Handle the successful response or perform any necessary actions
    res.json({ success: true, message: 'Payment initiated successfully' });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ success: false, message: 'Failed to initiate payment' });
  }
});  

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
