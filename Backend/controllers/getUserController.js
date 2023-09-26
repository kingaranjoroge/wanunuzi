const User = require('../models/User');
const Balance = require('../models/Balance');


const getUser = async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.findByPk(id.toString());
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "An error occurred" });
  }
}

const getUserByEmail = async (req, res) => {
    const { email } = req.params
    try {
        const user = await User.findOne({ where: { email }});
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "An error occurred" });
    }
}

const getBalanceById = async (req, res) => {
    const { id } = req.params;
    try {
        const balance = await Balance.findOne({ where: { userId: id }});
        if (balance) {
            res.json(balance);
        } else {
            res.status(404).json({ message: "Balance not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "An error occurred" });
    }
};

const getBalanceByEmail = async (req, res) => {
    const { email } = req.params;
    try {
        const user = await User.findOne({ where: { email }});
        if (user) {
            const balance = await Balance.findOne({ where: { userId: user.id }});
            if (balance) {
                res.json(balance);
            } else {
                res.status(404).json({ message: "Balance not found" });
            }
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "An error occurred" });
    }
};

module.exports = { getUser, getUserByEmail, getBalanceById, getBalanceByEmail }
