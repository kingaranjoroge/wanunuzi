const NextOfKin = require('../models/NextOfKin');

const addNextOfKin = async (req, res) => {
  try {
    // Extract the nextOfKin details from the request body
    const { userId, nextOfKin } = req.body;

    // Create a new NextOfKin entry in the table
    const newNextOfKin = await NextOfKin.create({
      userId,
      Name: nextOfKin.name,
      DOB: nextOfKin.dob,
      ID_BirthCertificate: nextOfKin.id,
      Phone: nextOfKin.phone,
      Email: nextOfKin.email,
      kraPin: nextOfKin.kraPin,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(200).json({ message: 'Next of Kin added successfully', data: newNextOfKin });
  } catch (error) {
    console.error('Error adding Next of Kin:', error);
    res.status(500).json({ message: 'Failed to add Next of Kin', error: error.message });
  }
};

module.exports = { addNextOfKin }