const express = require('express')
const router = express.Router()
const getLoanController = require('../controllers/getLoanController')
const auth = require("../auth/authMiddleware");

router.use(auth);

router.route('/:id')
    .get(getLoanController.getLoan)

router.route('/user/:userId')
    .get(getLoanController.getLoans)

module.exports = router
