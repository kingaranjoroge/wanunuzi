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
    const { userId, loanId, guarantorId,  guarantorAmount } = req.body;
    //console.log(req.body);
       if (!guarantorId || !userId || !loanId) {
        return res.status(400).json({ error: 'Invalid data.' });
       }
    try {

                //get Guarantor and User Data
              const guarantor = await Guarantor.findOne({ where: { userId: guarantorId } });
              const loanApplier = await User.findOne({ where: { id: userId } });
              const guarantee = await User.findOne({ where: { id: guarantorId } });

                if (guarantor) {
                    //edit the guarantor and set the decision to pending
                    const updatedGuarantor = await Guarantor.update({ decision: 'pending' }, { where: { userId: guarantorId } });
                    if (!updatedGuarantor) {
                        return res.status(500).json({ error: 'Failed to update guarantor.' });
                    }
                    //return res.status(200).json({ message: 'Guarantor updated successfully.' });
                    //TODO: send email to guarantor
                    let SERVER_URL = process.env.FRONTEND_URL;
                    const mailOptions = {
                        from: '"Wanunuzi Sacco" <admin@wanunuzi.com>',
                        to: guarantee.email,
                        subject: 'You have been added as a guarantor Again',
                        html: `<p>Hello, ${guarantor.fullName}. You have been added as a guarantor by ${loanApplier.fullName} for the loan with ID: ${loanId}. Please confirm using the link below to proceed.</p>
        <a href="${SERVER_URL}/verify-guarantor?loanUser=${userId}&loanId=${loanId}&guarantor=${guarantee.email}" style="background-color: #007BFF; color: white; padding: 10px 15px; text-decoration: none;">Verify Email</a>
        `,
                    };

                    await transporter.sendMail(mailOptions);

                    const mailOptions2 = {
                        from: '"Wanunuzi Sacco" <admin@wanunuzi.com>',
                        to: loanApplier.email,
                        subject: 'You have added a guarantor',
                        html: `<p>Hello, ${loanApplier.fullName}. You have added ${guarantee.fullName} as a guarantor for the loan with ID: ${loanId}. Please wait for the guarantor to confirm.</p>
        `,
                    };
                    await transporter.sendMail(mailOptions2);

                    return res.status(200).json({ message: 'Guarantor updated successfully.' });
                } else {
                    //create a new guarantor
                    const newGuarantor = await Guarantor.create({
                        userId: guarantorId,
                        loanId,
                        guaranteeAmount: guarantorAmount,
                    });
                    if (!newGuarantor) {
                        return res.status(500).json({ error: 'Failed to add guarantor.' });
                    }
                    //TODO: send email to guarantor
                    let SERVER_URL = process.env.FRONTEND_URL;
                    const mailOptions = {
                        from: '"Wanunuzi Sacco" <noreply@wanunuzi.com>',
                        to: guarantee.email,
                        subject: 'You have been added as a guarantor',
                        html: `<p>Hello, ${guarantor.fullName}. You have been added as a guarantor by ${loanApplier.fullName} for the loan with ID: ${loanId}. Please confirm using the link below to proceed.</p>
        <a href="${SERVER_URL}/verify-guarantor?loanUser=${userId}&loanId=${loanId}&guarantor=${guarantee.email}" style="background-color: #007BFF; color: white; padding: 10px 15px; text-decoration: none;">Verify Email</a>
        `,
                    };

                    await transporter.sendMail(mailOptions);
                    res.status(200).json({ message: 'Guarantor added successfully.' });

                    const mailOptions2 = {
                        from: '"Wanunuzi Sacco" <noreply@wanunuzi.com>',
                        to: loanApplier.email,
                        subject: 'You have added a guarantor',
                        html: `<p>Hello, ${loanApplier.fullName}. You have added ${guarantee.fullName} as a guarantor for the loan with ID: ${loanId}. Please wait for the guarantor to confirm.</p>
        `,
                    };
                    await transporter.sendMail(mailOptions2);

                    return res.status(200).json({ message: 'Guarantor added successfully.' });
                    }

    }catch (err) {
           console.log(err);
           res.status(500).json({ message: "An error occurred" });
    }
}

module.exports = { addOneGuarantorToLoan };