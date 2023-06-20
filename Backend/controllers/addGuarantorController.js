const User = require('../models/User');
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
});

const addGuarantor = async (req, res) => {
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
    if (!guarantor.email) {
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
}

module.exports = { addGuarantor }