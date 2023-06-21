const User = require('../models/User');
const Savings = require('../models/Savings');

const deposit = async (req, res) => {
  try {
    const { amount, phoneNumber, userId } = req.body;

    // Retrieve the current user
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      // If no user record exists, handle the error appropriately
      return res.status(400).json({ error: 'User not found' });
    }

    // Retrieve the latest savings record for the user
    const latestSavingsRecord = await Savings.findOne({
      where: { userId },
      order: [['date', 'DESC']], // Get the record with the latest date
    });

    let balance = parseFloat(amount);

    if (latestSavingsRecord) {
      // Calculate the balance as the sum of all previous balances and the amount deposited in the most recent record
      balance += latestSavingsRecord.balance;
    }

    // Create a new savings record for the user
    const newSavingsRecord = await Savings.create({
      userId: user.id,
      date: new Date(), // Set the current date
      amount: parseFloat(amount),
      balance,
      createdAt: new Date(), // Set the created timestamp
      updatedAt: new Date(), // Set the updated timestamp
    });

    res.json({ newBalance: newSavingsRecord.balance });
  } catch (error) {
    console.error('Error making savings deposit:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { deposit };
