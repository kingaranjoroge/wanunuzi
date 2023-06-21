const express = require('express')
const router = express.Router()
const getLoanController = require('../controllers/getLoanController')

router.route('/:id')
    .get(getLoanController.getLoan)

router.route('/user/:userId')
    .get(getLoanController.getLoans)

module.exports = router
