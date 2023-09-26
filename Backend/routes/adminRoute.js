const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../auth/authMiddleware');
const documentController = require('../controllers/DocumentController');

router.use(auth);

// All routes in this file are protected to allow admin access only

router.use(adminController.checkAdminRole);

router.get('/isAdmin', auth, adminController.isAdmin);

router.get('/someAdminAction', adminController.someAdminAction);

router.get('/getLoan/:id', adminController.getLoan);

router.get('/getAllLoans', adminController.getAllLoans);

router.put('/updateLoan/:id', adminController.updateLoan);

router.get('/getAllDocuments', documentController.getAllDocuments);

router.get('/getDocuments/:userId', documentController.getDocumentsByUserId);

router.put('/updateDocument/:id', documentController.updateDocumentStatus);

router.get('/someAdminAction', adminController.someAdminAction);

module.exports = router;