const User = require('../models/User');

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

module.exports = { getUser }
