const express = require('express')
const router = express.Router()
const savingsBalanceContoller = require('../controllers/savingsBalanceController')

router.route('/')
    .get(savingsBalanceContoller.savingsBalance)  

module.exports = router