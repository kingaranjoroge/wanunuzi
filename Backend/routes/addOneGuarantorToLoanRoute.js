const express = require('express')
const router = express.Router()
const { addOneGuarantorToLoan } = require('../controllers/addOneGuarantorToLoanController')

router.route('/')
    .post(addOneGuarantorToLoan)

module.exports = router