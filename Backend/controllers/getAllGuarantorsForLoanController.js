const Guarantor = require("../models/Guarantor");

const getAllGuarantorsForLoan = async (req, res) => {
    const { loanId } = req.params;
    try {
        const loanGuarantors = await Guarantor.findAll({ where: { loanId }});
        //if zero guarantors return no guarantors found

        if(loanGuarantors.length === 0) {
            res.status(404).json({ message: "No guarantors found" });
        }else{
            res.json(loanGuarantors);
        }
        // if (loanGuarantors) {
        //     res.json(loanGuarantors);
        // } else {
        //     res.status(404).json({ message: "Loan guarantors not found" });
        // }
    } catch (err) {
        res.status(500).json({ message: "An error occurred" });
    }
}

module.exports = { getAllGuarantorsForLoan };