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
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
});

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

      // generate a random token for email verification
      const buffer = crypto.randomBytes(20);
      const token = buffer.toString('hex');

      const user = await User.create({
        fullName: req.body.fullName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        idNumber: req.body.idNumber,
        password: hashedPassword,
        emailVerificationToken: token,  // store the token in the user model
        emailVerified: false  // flag to check if the email is verified
      });

      // send an email with the verification token
      const mailOptions = {
        from: '"My App" <myapp@example.com>', // sender address
        to: req.body.email, // receiver address
        subject: 'Email Verification', // Subject line
        text: `Please verify your email by using the following token: ${token}`, // plain text body
      };

      await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.error(error);
          res.status(500).json({message: 'Error sending verification email'});
        } else {
          res.status(201).json({message: 'User created successfully. Verification email sent.'});
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating user' });
    }
});

app.post('/verify-email', async (req, res) => {
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
});



app.post('/createLoan', async (req, res) => {
  try {
    const { userId, amount, interestRate, dueDate } = req.body;
    const loan = await Loan.create({
      userId,
      amount,
      interestRate,
      startDate: new Date(),
      dueDate: new Date(dueDate),
      status: 'pending'
    });

    res.status(201).json({ message: 'Loan created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating Loan' });
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
