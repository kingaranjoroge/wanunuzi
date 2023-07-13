const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../auth/authMiddleware');
const documentController = require('../controllers/DocumentController');

router.use(auth); // use authentication middleware
router.use(adminController.checkAdminRole); // use role check middleware

// Route to check if the user is an admin
router.get('/isAdmin', auth, adminController.isAdmin);

router.get('/someAdminAction', adminController.someAdminAction);

router.get('/getLoan/:id', adminController.getLoan);

router.get('/getAllLoans', adminController.getAllLoans);
router.put('/updateLoan/:id', adminController.updateLoan);

// Route to get all uploaded documents
router.get('/getAllDocuments', documentController.getAllDocuments);

// Route to get documents of a specific user
router.get('/getDocuments/:userId', documentController.getDocumentsByUserId);

// Route to update a document's status
router.put('/updateDocument/:id', documentController.updateDocumentStatus);

router.get('/someAdminAction', adminController.someAdminAction);

module.exports = router;