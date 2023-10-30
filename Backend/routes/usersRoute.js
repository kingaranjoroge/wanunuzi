const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.route('/').post(usersController.createUser);
router.route('/:id').get(usersController.getUserById);
router.route('/').get(usersController.getAllUsers);
router.route('/:id').put(usersController.updateUser);
router.route('/:id').patch(usersController.updateUser);
router.route('/:id').delete(usersController.deleteUser);
router.route('/:id/paymentStatus').get(usersController.getPaymentStatus);

module.exports = router;
