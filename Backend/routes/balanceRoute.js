const express = require('express')
const router = express.Router()
const balanceContoller = require('../controllers/balanceController')

router.route('/:userId')
    .get(balanceContoller.balance)  
module.exports = router