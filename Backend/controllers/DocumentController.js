const { Document,User } = require('../models/initialize');
const jwt = require('jsonwebtoken');

exports.uploadDocument = async (req, res) => {
    const { type, description } = req.body;
    const file = req.file;
    const token = req.header('x-auth-token');
    const decoded = jwt.decode(token, process.env.JWT_SECRET)
    //const decodedToken = jwt.verify(token, process.env.JWT_SECRET);  // Decode token to get user data
    const userId = decoded.userId;

    console.log(req.body);

    if (!file) {
        return res.status(400).json({
            success: false,
            message: 'No file was uploaded.',
        });
    }

    try {
        const document = await Document.create({
            userId,
            type,
            imagePath: file.path, // Adjust as needed based on your file storage solution
            description,
        });

        res.status(200).json({
            success: true,
            data: document,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'An error occurred while uploading the document.'
        });
    }
};

exports.getAllDocuments = (req, res) => {
    // Get all documents from the database with their associated user
    Document.findAll({ include: User })
        .then((documents) => {
            res.send(documents);
        })
        .catch((error) => {
            res.status(500).send({ error: error.message });
        });
};

exports.updateDocumentStatus = (req, res) => {
    Document.update(
        { status: req.body.status },
        { where: { id: req.params.id } }
    )
        .then(() => {
            res.send({ message: 'Document status updated.' });
        })
        .catch((error) => {
            res.status(500).send({ error: error.message });
        });
};

exports.getDocumentsByUserId = (req, res) => {
    const userId = req.params.userId;

    Document.findAll({ where: { userId: userId } })
        .then((documents) => {
            res.send(documents);
        })
        .catch((error) => {
            res.status(500).send({ error: error.message });
        });
};

exports.updateDocumentStatus = (req, res) => {
    const documentId = req.params.id;
    const status = req.body.status;

    Document.update(
        { status: status },
        { where: { id: documentId } }
    )
        .then(() => {
            res.send({ message: 'Document status updated.' });
        })
        .catch((error) => {
            res.status(500).send({ error: error.message });
        });
};

