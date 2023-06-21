const User = require('../models/User');
const Guarantor = require("../models/Guarantor");
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

const addGuarantorsToLoan = async (req, res) => {
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

    // Send email to each guarantor
    for (let i = 0; i < guarantors.length; i++) {
      const guarantor = await User.findOne({ where: { id: guarantors[i] } });

      let SERVER_URL = process.env.FRONTEND_URL;
      const mailOptions = {
        from: '"Wanunuzi Sacco" <admin@wanunuzi.com>',
        to: guarantor.email,
        subject: 'You have been added as a guarantor',
        html: `<p>Hello, ${guarantor.fullName}. You have been added as a guarantor by ${userId} for the loan with ID: ${loanId}. Please confirm using the link below to proceed.</p>
        <a href="${SERVER_URL}/verify-guarantor?loanUser=${userId}&loanId=${loanId}&guarantor=${guarantor.email}" style="background-color: #007BFF; color: white; padding: 10px 15px; text-decoration: none;">Verify Email</a>
        `,
      };

      await transporter.sendMail(mailOptions);
    }

    res.json({ message: 'Guarantors added and notified successfully.' });

  } catch(err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while creating the guarantors.' });
  }
}

module.exports = { addGuarantorsToLoan }
