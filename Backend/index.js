const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Loan = require('./models/Loan');
const cors = require('cors'); // don't forget to install this: npm install cors
const cookieParser = require('cookie-parser');
const sequelize = require('./models/database');
const { Verification } = require('./models/Verification');
const axios = require('axios');
const base64 = require('base-64');
require('dotenv').config(); // don't forget to install this: npm install dotenv

const app = express();

app.use(cors());
app.use(express.json());
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const Balance = require("./models/Balance");
const Guarantor = require("./models/Guarantor");
require('dotenv').config();

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: process.env.PORT,
  secure: process.env.SECURE,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS
  }
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
    const buffer = crypto.randomBytes(10);
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

    // Create a balance record for the user
    const balance = await Balance.create({
      userId: user.id,
      amount: 0.0
    });

// send an email with the verification token
    const mailOptions = {
      from: '"Wanunuzi Sacco" <admin@wanunuzi.com>', // sender address
      to: req.body.email, // receiver address
      subject: 'Welcome to Wanunuzi Sacco! Please Verify Your Email', // Subject line
      html: `
        <div style="background-color: #f4f4f4; padding: 20px; font-family: Arial, sans-serif;">
            <h2 style="color: #007BFF;">Welcome to Wanunuzi Sacco!</h2>
            <p>Thank you for registering. As the last step of your registration, we need to verify your email address. Please click the button below to confirm your email address.</p>
            <div style="margin: 20px 0;">
                <a href="https://wanunuzi.com/verify/${token}" style="background-color: #007BFF; color: white; padding: 10px 15px; text-decoration: none;">Verify Email</a>
            </div>
            <p>If you can't click the button above, please copy and paste the following token into the verification field on our website:</p>
            <p><strong>${token}</strong></p>
            <p>Best Regards,</p>
            <p>The Wanunuzi Sacco Team</p>
        </div>
    `, // HTML body
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

app.post('/addGuarantor', async (req, res) => {
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

    // Compose the email
    const mailOptions = {
      from: '"Wanunuzi Sacco" <admin@wanunuzi.com>', // sender address
      to: guarantor.email, // receiver address
      subject: 'You have been added as a guarantor', // Subject line
      text: `Hello, ${guarantor.fullName}. You have been added as a guarantor by ${user.fullName} in Wanunuzi Sacco. Please confirm your email to proceed.`, // plaintext body
    };

    // Send the email
    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error sending email' });
      } else {
        console.log('Email sent: ' + info.response);
        return res.status(200).json({ message: 'Email sent successfully', tick: true });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});


app.get('/user/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "An error occurred" });
  }
});



app.post('/addGuarantorsToLoan', async (req, res) => {
  const { userId, loanId, guarantors } = req.body;

  if (!guarantors || !Array.isArray(guarantors)) {
    res.status(400).json({ error: 'Invalid guarantors array.' });
    return;
  }

  if (!loanId) {
    res.status(400).json({ error: 'Invalid loan ID.' });
    return;
  }

  if (guarantors.length !== 3) {
    res.status(400).json({ error: 'Exactly three guarantors must be provided.' });
    return;
  }

  try {
    await Guarantor.create({
      loanId,
      guarantor1: guarantors[0],
      guarantor2: guarantors[1],
      guarantor3: guarantors[2]
    });

    res.json({ message: 'Guarantors added successfully.' });
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while creating the guarantors.' });
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

    res.status(201).json({ message: 'Loan created successfully', loanId: loan.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating Loan' });
  }
});


//balance
app.get('/balance/:userId', async (req, res) => {
  const { userId } = req.params;

  const balance = await Balance.findOne({ where: { userId } });

  if (!balance) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({ balance: balance.amount });
});


app.get('/getLoans/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const loans = await Loan.findAll({ where: { userId: userId }});
    if (loans.length) {
      res.json(loans);
    } else {
      res.status(404).json({ message: "No loans found for the provided user id" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred" });
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
        expiresIn: '50m' // Token expiration time (optional)
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
  //console.log('Headers:', req.headers);
  //console.log('Body:', req.body);

  const userId = req.body.userId;

  console.log('User ID:', userId);

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

  if (paymentRes.data.ResponseCode == '0') {
    // The request was accepted successfully
    const verificationDetails = {
      checkoutRequestID: paymentRes.data.CheckoutRequestID,
      phoneNumber: req.body.PhoneNumber,
      amount: req.body.Amount,
      mpesaReceiptNumber: paymentRes.data.MerchantRequestID, // assuming this is the mpesaReceiptNumber
      transactionDate: new Date(), // you need to get the transactionDate from somewhere or use the current date
      resultCode: paymentRes.data.ResponseCode,
      resultDesc: paymentRes.data.ResponseDescription,
      userId: userId, // you need to get the userId from somewhere
    };

    try {
      // Save the verification details in the database
      await Verification.create(verificationDetails);
      console.log(`Verification details saved with CheckoutRequestID ${verificationDetails.checkoutRequestID}`);
    } catch (error) {
      console.error('Failed to save verification details:', error);
    }
  } else {
    console.log('Failed to initiate payment request:', paymentRes.data.CustomerMessage);
  }

  res.send(paymentRes.data);
});

//callback url for the payment
app.post('/callback', async (req, res) => {
  const callbackData = req.body;
  const resultCode = callbackData.Body.stkCallback.ResultCode;
  const checkoutRequestID = callbackData.Body.stkCallback.CheckoutRequestID;

  try {
    const verification = await Verification.findOne({ where: { checkoutRequestID: checkoutRequestID } });

    if (!verification) {
      console.log(`No verification details found for CheckoutRequestID ${checkoutRequestID}`);
      res.sendStatus(404);
      return;
    }

    if (resultCode == '0') {
      // The payment was successful
      verification.resultCode = resultCode;
      verification.resultDesc = callbackData.Body.stkCallback.ResultDesc;
      verification.transactionID = callbackData.Body.stkCallback.CallbackMetadata.Item[1].Value;
      verification.transactionDate = callbackData.Body.stkCallback.CallbackMetadata.Item[3].Value;
      await verification.save();
      console.log(`Verification details updated for CheckoutRequestID ${checkoutRequestID}`);
    } else {
      // The payment was not successful
      verification.resultCode = resultCode;
      verification.resultDesc = callbackData.Body.stkCallback.ResultDesc;
      await verification.save();
      console.log(`Verification details updated for CheckoutRequestID ${checkoutRequestID} with error: ${verification.resultDesc}`);
    }
  } catch (error) {
    console.error('Failed to update verification details:', error);
    res.sendStatus(500);
    return;
  }

  res.sendStatus(200);
});



const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});