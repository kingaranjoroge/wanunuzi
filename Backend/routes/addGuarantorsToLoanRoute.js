const express = require('express')
const router = express.Router()
const addGuarantorsToLoanController = require('../controllers/addGuarantorsToLoanController')

router.route('/')
    .post(addGuarantorsToLoanController.addGuarantorsToLoan)

module.exports = router