<<<<<<< HEAD
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
=======
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const auth = require("../auth/authMiddleware");

router.use(auth)

router.route('/').post(usersController.createUser);
router.route('/:id').get(usersController.getUserById);
router.route('/').get(usersController.getAllUsers);
router.route('/:id').put(usersController.updateUser);
router.route('/:id').patch(usersController.updateUser);
router.route('/:id').delete(usersController.deleteUser);

module.exports = router;
>>>>>>> 73032f202ab021e03e2bc60d6370cf99c3a84f4e
