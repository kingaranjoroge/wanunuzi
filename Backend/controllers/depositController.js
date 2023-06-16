const User = require('../models/User');
const Savings = require('../models/Savings')

const deposit = async (req, res) => {
    try {
        const { amount, phoneNumber, userId } = req.body;
    
        // Retrieve the current user
        const user = await User.findOne({ where: { id: userId } });
    
        if (!user) {
          // If no user record exists, handle the error appropriately
          return res.status(400).json({ error: 'User not found' });
        }
    
        // Retrieve the current savings record for the user
        let savings = await Savings.findOne({ where: { userId: user.id } });
    
        if (!savings) {
          // If no savings record exists for the user, create a new one
          savings = await Savings.create({
            userId: user.id,
            date: new Date(), // Set the current date
            amount: parseFloat(amount),
            balance: parseFloat(amount),
            createdAt: new Date(), // Set the created timestamp
            updatedAt: new Date() // Set the updated timestamp
          });
        } else {
          // Calculate the new balance after the deposit
          const currentBalance = savings.balance;
          const newBalance = currentBalance + parseFloat(amount);
    
          // Update the existing savings record with the new balance and updated timestamp
          await savings.update({
            amount: parseFloat(amount),
            balance: newBalance,
            updatedAt: new Date() // Set the updated timestamp
          });
        }
    
        res.json({ newBalance: savings.balance });
      } catch (error) {
        console.error('Error making savings deposit:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

module.exports = { deposit }