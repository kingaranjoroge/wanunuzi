const Guarantor = require('../models/Guarantor');
const Loan = require('../models/Loan');
const { Op } = require("sequelize");

const addDecision = async (req, res) => {
    const { loanId, guarantorId, guaranteeAmount } = req.body;
    const decision = "accepted"; // Set the decision to "accepted"

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
