const User = require('../models/User');
const Balance = require("../models/Balance");
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
// require('dotenv').config();


// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

const createUser = async (req, res) => {
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
        let SERVER_URL = process.env.SERVER_URL || 'http://localhost:3000';
        const mailOptions = {
            from: '"Wanunuzi Sacco" <admin@wanunuzi.com>',
            to: req.body.email,
            subject: 'Welcome to Wanunuzi Sacco! Please Verify Your Email',
            html: `
            <div style="background-color: #f4f4f4; padding: 20px; font-family: Arial, sans-serif;">
                <h2 style="color: #007BFF;">Welcome to Wanunuzi Sacco!</h2>
                <p>Thank you for registering. As the last step of your registration, we need to verify your email address. Please click the button below to confirm your email address.</p>
                <div style="margin: 20px 0;">
                  <a href="${SERVER_URL}/verify-email?token=${token}&email=${encodeURIComponent(req.body.email)}" style="background-color: #007BFF; color: white; padding: 10px 15px; text-decoration: none;">Verify Email</a>
                </div>
                <p>If you can't click the button above, please copy and paste the following link into your browser:</p>
                <p><strong>${SERVER_URL}/verify/${encodeURIComponent(req.body.email)}/${encodeURIComponent(token)}</strong></p>
                <p>Best Regards,</p>
                <p>The Wanunuzi Sacco Team</p>
            </div>
        `,
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
}

module.exports = { createUser }