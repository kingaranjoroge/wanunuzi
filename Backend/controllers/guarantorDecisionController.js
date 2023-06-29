const Guarantor = require('../models/Guarantor');
const Loan = require('../models/Loan');
const { Op } = require("sequelize");
const nodemailer = require('nodemailer');
const User = require('../models/User');

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
const addDecision = async (req, res) => {
    const { loanId, guarantorId, guaranteeAmount, decision } = req.body;
    //const decision = "accepted"; // Set the decision to "accepted"

    try {
        const existingDecision = await Guarantor.findOne({
            where: {
                loanId: loanId,
                userId: guarantorId,
                decision: {
                    [Op.in]: ['accepted', 'rejected'],
                },
            },
        });

        if (existingDecision) {
            return res.status(400).json({ message: "You've already made a decision for this loan. If you wish to change it, please contact an admin." });
        }

        if(decision === "rejected"){
            // Send email to the borrower
            const loan = await Loan.findOne({
                where: {
                    id: loanId,
                },
            });

            const borrower = await User.findOne({
                where: {
                    id: loan.userId,
                },
            });

            const guarantor = await User.findOne({
                where: {
                    id: guarantorId,
                },
            });

            console.log(borrower.email);
            const FRONTEND_URL = process.env.FRONTEND_URL;

            // send mail with defined transport object
            const mailOptions = {
                from: '"Wanunuzi Sacco" <admin@wanunuzi.com>',
                to: borrower.email,
                subject: 'Loan Application Rejected',
                html: ` <p>Dear ${borrower.fullName},</p>
                        <p>Your loan application has been rejected by ${guarantor.fullName}</p>
                        <p>Regards,</p>
                        <p>Wanunuzi Sacco</p>
                       <p>
                       click <a href="${FRONTEND_URL}/login">here</a> to login to your account.
                       and add another guarantor.
                       </p>
                    `,
         };
            await transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.error(error);
                    res.status(500).json({message: 'An error occurred while sending the email.'});
                } else {
                    res.status(201).json({message: 'Email sent successfully.'});
                }
            });

        }

        const [updatedRows] = await Guarantor.update(
            { decision: decision, guaranteeAmount: guaranteeAmount },
            {
                where: {
                    loanId: loanId,
                    userId: guarantorId,
                },
            }
        );

        if (updatedRows > 0) {
            const acceptedDecisions = await Guarantor.count({
                where: {
                    loanId: loanId,
                    decision: 'accepted',
                },
            });

            if (acceptedDecisions >= 3) {
                await Loan.update(
                    { status: 'verified' },
                    { where: { id: loanId } }
                );
            }

            res.json({ message: "Decision updated successfully." });
        } else {
            res.status(404).json({ message: "No matching record found." });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred." });
    }
};

module.exports = { addDecision };
