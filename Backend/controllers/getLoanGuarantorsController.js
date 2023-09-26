const Guarantor = require("../models/Guarantor");


const getLoanGuarantors = async (req, res) => {
    const { id } = req.params;
    try {
        const loanGuarantor = await Guarantor.findOne({ where: { id }});
        if (loanGuarantor) {
            res.json(loanGuarantor);
        } else {
            res.status(404).json({ message: "Loan guarantor not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "An error occurred" });
    }
}

//get loan guarantors using the user id and loan id
const getLoanGuarantorsByLoanIdAndUserId = async (req, res) => {
    const { userId, loanId } = req.params;
    try {
        const loanGuarantors = await Guarantor.findAll({ where: { userId, loanId }});
        if (loanGuarantors) {
            res.json(loanGuarantors);
        } else {
            res.status(404).json({ message: "Loan guarantors not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "An error occurred" });
    }
}


module.exports = { getLoanGuarantors, getLoanGuarantorsByLoanIdAndUserId };
