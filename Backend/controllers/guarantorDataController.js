const Guarantor = require('../models/Guarantor');
const User = require('../models/User');

const getGuarantorDataByEmail = async (req, res) => {
    const { email, loanId } = req.params;
    try {
        // find the user by email
        const user = await User.findOne({ where: { email } });
        if (user) {
            const guarantor = await Guarantor.findOne({ where: { userId: user.id, loanId } });
            if (guarantor) {
                res.json(guarantor);
            } else {
                res.status(404).json({ message: "Guarantor not found" });
            }
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "An error occurred" });
    }
};

const getGuaranteeAmountById = async (req, res) => {
    const { id } = req.params;
    try {
        const guarantor = await Guarantor.findOne({ where: { userId: id } });
        if (guarantor) {
            res.json(guarantor.guaranteeAmount);
        } else {
            res.status(404).json({ message: "Guarantor not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "An error occurred" });
    }
}

module.exports = { getGuarantorDataByEmail, getGuaranteeAmountById };
