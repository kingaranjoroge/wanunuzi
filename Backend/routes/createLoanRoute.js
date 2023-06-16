const express = require('express')
const router = express.Router()
const createLoanContoller = require('../controllers/createLoanController')

router.route('/')
    .post(createLoanContoller.createLoan)  

module.exports = router