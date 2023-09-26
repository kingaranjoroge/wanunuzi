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
