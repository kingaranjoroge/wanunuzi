const Savings = require('../models/Savings');

const getSavingsData = async (req, res) => {
  try {
    const { userId } = req.params;

    const savingsData = await Savings.findAll({ where: { userId } }); // Retrieve all savings data from the database

    res.json(savingsData);
  } catch (error) {
    console.error('Error retrieving savings data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getSavingsData };
