const Balance = require("../models/Balance");

const balance = async (req, res) => {
    const { userId } = req.params;

  const balance = await Balance.findOne({ where: { userId } });

  if (!balance) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({ balance: balance.amount });
}

module.exports = { balance }