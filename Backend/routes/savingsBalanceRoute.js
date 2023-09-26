const express = require('express')
const router = express.Router()
const savingsBalanceContoller = require('../controllers/savingsBalanceController')

router.route('/:userId')
    .get(savingsBalanceContoller.savingsBalance)  

module.exports = router