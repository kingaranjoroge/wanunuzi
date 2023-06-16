const express = require('express')
const router = express.Router()
const addGuarantorsToLoanContoller = require('../controllers/addGuarantorsToLoanController')

router.route('/')
    .post(addGuarantorsToLoanContoller.addGuarantorsToLoan)  

module.exports = router