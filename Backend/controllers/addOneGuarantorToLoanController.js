const User = require('../models/User');
const Guarantor = require('../models/Guarantor');
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const addOneGuarantorToLoan = async (req, res) => {
    const { userId, loanId, guarantorId } = req.body;

}

module.exports = { addOneGuarantorToLoan };