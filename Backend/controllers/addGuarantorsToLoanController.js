const Guarantor = require("../models/Guarantor");

const addGuarantorsToLoan = async (req, res) => {
    const { userId, loanId, guarantors } = req.body;

  if (!guarantors || !Array.isArray(guarantors)) {
    res.status(400).json({ error: 'Invalid guarantors array.' });
    return;
  }

  if (!loanId) {
    res.status(400).json({ error: 'Invalid loan ID.' });
    return;
  }

  if (guarantors.length !== 3) {
    res.status(400).json({ error: 'Exactly three guarantors must be provided.' });
    return;
  }

  try {
    await Guarantor.create({
      loanId,
      guarantor1: guarantors[0],
      guarantor2: guarantors[1],
      guarantor3: guarantors[2]
    });

    res.json({ message: 'Guarantors added successfully.' });
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while creating the guarantors.' });
  }
}

module.exports = { addGuarantorsToLoan }