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

    // Get the current date in East African Time (EAT)
    const currentDate = new Date().toLocaleString('en-US', {
      timeZone: 'Africa/Nairobi',
    });

    // Create a new savings record for the user with the current East African Time
    const newSavingsRecord = await Savings.create({
      userId: user.id,
      date: currentDate,
      amount: parseFloat(amount),
      balance,
      createdAt: currentDate,
      updatedAt: currentDate,
    });

    res.json({ newBalance: newSavingsRecord.balance });
  } catch (error) {
    console.error('Error making savings deposit:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { deposit };
