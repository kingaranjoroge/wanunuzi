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

const getNextOfKin = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the NextOfKin entry associated with the userId
    const nextOfKin = await NextOfKin.findOne({ where: { userId } });

    if (!nextOfKin) {
      return res.status(404).json({ message: 'Next of Kin not found' });
    }

    // Extract the required user details
    const nextOfKinDetails = {
      name: nextOfKin.Name,
      dob: nextOfKin.DOB,
      idNumber: nextOfKin.ID_BirthCertificate,
      phoneNumber: nextOfKin.Phone,
      email: nextOfKin.Email,
      kraPin: nextOfKin.kraPin
    };
    
    // Respond with the user details
    console.log(nextOfKinDetails);
    res.json(nextOfKinDetails);
  } catch (error) {
      console.error("Error fetching nextOfKin details:", error);
      return res.status(500).json({ message: 'Server error' });
  } 
}  

const updateNextOfKin = async (req, res) => {
  try {
    const { name, email, phoneNumber, idNumber, dob, kraPin } = req.body;
    const { userId } = req.params;

    // Retrieve nextOfKin details from the database
    const nextOfKin = await NextOfKin.findOne({ where: { userId } });

    // If the nextOfKin doesn't exist, return an error
    if (!nextOfKin) {
      return res.status(404).json({ message: 'Next of Kin not found' });
    }

    // Update the nextOfKin details
    nextOfKin.Name = name;
    nextOfKin.Email = email;
    nextOfKin.Phone = phoneNumber;
    nextOfKin.ID_BirthCertificate = idNumber;
    nextOfKin.DOB = dob;
    nextOfKin.kraPin = kraPin;

    await nextOfKin.save();

    res.json({ message: 'Next of Kin details updated successfully' });
  } catch (error) {
    console.error("Error updating nextOfKin details:", error);
    return res.status(500).json({ message: 'Server error' });
  }
};


module.exports = { addNextOfKin, getNextOfKin, updateNextOfKin }