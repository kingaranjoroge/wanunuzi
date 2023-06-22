const GuarantorDecision = require('../models/GuarantorDecision');
const Loan = require('../models/Loan');

const addDecision = async (req, res) => {
    const { loanId, guarantorId, decision } = req.body;
    try {
        const existingDecision = await GuarantorDecision.findOne({
            where: {
                loanId: loanId,
                guarantorId: guarantorId,
            },
        });

        if (existingDecision) {
            return res.status(400).json({ message: "You've already made a decision for this loan. If you wish to change it, please contact an admin." });
        }

        const guarantorDecision = await GuarantorDecision.create({
            loanId: loanId,
            guarantorId: guarantorId,
            decision: decision,
        });

        if (guarantorDecision) {
            const acceptedDecisions = await GuarantorDecision.count({
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

            res.json(guarantorDecision);
        } else {
            res.status(404).json({ message: "Decision could not be recorded." });
        }
    } catch (err) {
        res.status(500).json({ message: "An error occurred." });
    }
};

module.exports = { addDecision };