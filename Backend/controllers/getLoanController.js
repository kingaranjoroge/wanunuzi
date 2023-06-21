const Loan = require('../models/Loan');
const Guarantor = require('../models/Guarantor');
const GuarantorDecision = require('../models/GuarantorDecision');

const getLoan = async (req, res) => {
    const { id } = req.params;
    try {
        const loan = await Loan.findByPk(id.toString());
        if (loan) {
            res.json(loan);
        } else {
            res.status(404).json({ message: "Loan not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "An error occurred" });
    }
}

const getLoans = async (req, res) => {
    const { userId } = req.params;
    try {
        const loans = await Loan.findAll({
            where: { userId: userId },
            include: [
                {
                    model: Guarantor,
                    include: [
                        {
                            model: GuarantorDecision
                        }
                    ]
                },
            ]
        });

        if (loans) {
            res.json(loans);
        } else {
            res.status(404).json({ message: "No loans found for this user" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred" });
    }
}


module.exports = { getLoan, getLoans }
