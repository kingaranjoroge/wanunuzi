const Loan = require('../models/Loan');

const createLoan = async (req, res) => {
    try {
        const { userId, amount, interestRate, dueDate } = req.body;
        const loan = await Loan.create({
          userId,
          amount,
          interestRate,
          startDate: new Date(),
          dueDate: new Date(dueDate),
          status: 'pending'
        });
    
        res.status(201).json({ message: 'Loan created successfully', loanId: loan.id });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating Loan' });
      }
}

module.exports = { createLoan }