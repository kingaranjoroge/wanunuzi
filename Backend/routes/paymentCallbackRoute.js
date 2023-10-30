const express = require('express')
const router = express.Router()
const paymentCallbackContoller = require('../controllers/paymentCallbackController')

router.route('/')
    .post(paymentCallbackContoller.paymentCallback)  

module.exports = router