const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../auth/authMiddleware');

router.use(auth); // use authentication middleware
router.use(adminController.checkAdminRole); // use role check middleware

router.get('/someAdminAction', adminController.someAdminAction);

module.exports = router;
