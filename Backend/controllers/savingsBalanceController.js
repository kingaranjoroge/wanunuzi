const Savings = require('../models/Savings')

const savingsBalance = async (re, res) => {
    try {
        // Retrieve the savings balance from the database
        const savings = await Savings.findOne(); // Assuming you have a table/collection named "savings" in your database
        const balance = savings ? savings.balance : 0; // Assuming you have a "balance" field in your "savings" table/collection
    
        res.json({ balance });
      } catch (error) {
        console.error('Error retrieving savings balance:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

module.exports = { savingsBalance }