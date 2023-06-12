const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Loan = require('./models/Loan');
const cors = require('cors'); // don't forget to install this: npm install cors
const cookieParser = require('cookie-parser');
const sequelize = require('./models/database');
const axios = require('axios');
const base64 = require('base-64');
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
        emailVerified: false,  // flag to check if the email is verified
        accountActivated: false // flag to check if the account is activated
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
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);

  const consumerKey = process.env.CONSUMER_KEY;
  const consumerSecret = process.env.CONSUMER_SECRET;

  // Get OAuth access token
  const authRes = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
    headers: {
      'Authorization': `Basic ${base64.encode(`${consumerKey}:${consumerSecret}`)}`
    }
  });

  const accessToken = authRes.data.access_token;

  // Make actual payment request
  const paymentRes = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
    "BusinessShortCode": req.body.BusinessShortCode,
    "Password": req.body.Password,
    "Timestamp": req.body.Timestamp,
    "TransactionType": req.body.TransactionType,
    "Amount": req.body.Amount,
    "PartyA": req.body.PartyA,
    "PartyB": req.body.PartyB,
    "PhoneNumber": req.body.PhoneNumber,
    "CallBackURL": req.body.CallBackURL,
    "AccountReference": req.body.AccountReference,
    "TransactionDesc": req.body.TransactionDesc
  }, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  res.send(paymentRes.data);
});

//callback url for the payment
app.post('/payment/callback', async (req, res) => {
  const { Body: { stkCallback: { ResultCode, ResultDesc, CallbackMetadata } } } = req.body;

  if (ResultCode === 0) {
    const amount = CallbackMetadata.Item.find(item => item.Name === 'Amount').Value;
    const phoneNumber = CallbackMetadata.Item.find(item => item.Name === 'PhoneNumber').Value;

    console.log(`Payment of ${amount} was successful for user with phone number: ${phoneNumber}`);
  } else {
    console.error(`Payment failed with error: ${ResultDesc}`);
  }

  res.status(200).end();
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});