const Savings = require('../models/Savings');

const savingsBalance = async (req, res) => {
  try {
    const { userId } = req.params;

    // Retrieve the latest savings record for the user
    const latestSavingsRecord = await Savings.findOne({
      where: { userId },
      order: [['date', 'DESC']], // Get the record with the latest date
    });

    let balance = 0;

    if (latestSavingsRecord) {
      balance = latestSavingsRecord.balance; // Set the balance to the balance of the latest savings record
    } else {
      // If there are no savings records for the user, set the balance to 0 or handle it according to your requirements
      balance = 0;
    }

    res.json({ balance });
  } catch (error) {
    console.error('Error retrieving savings balance:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { savingsBalance };
