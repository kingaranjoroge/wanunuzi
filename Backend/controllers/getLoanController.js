const Loan = require('../models/Loan');

const getLoan = async (req, res) => {
    const { id } = req.params
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

module.exports = { getLoan }
