const express = require('express')
const router = express.Router()
const paymentContoller = require('../controllers/paymentController')

router.route('/')
    .post(paymentContoller.payment)  

module.exports = router