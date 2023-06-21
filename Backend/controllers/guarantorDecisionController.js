const GuarantorDecision = require('../models/GuarantorDecision');

const addDecision = async (req, res) => {
    const { loanId, guarantorId, decision } = req.body
    try {
        const guarantorDecision = await GuarantorDecision.create({
            loanId: loanId,
            guarantorId: guarantorId,
            decision: decision
        });
        if (guarantorDecision) {
            res.json(guarantorDecision);
        } else {
            res.status(404).json({ message: "Decision could not be recorded" });
        }
    } catch (err) {
        res.status(500).json({ message: "An error occurred" });
    }
}

module.exports = { addDecision }
