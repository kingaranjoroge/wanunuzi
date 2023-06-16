const express = require('express')
const router = express.Router()
const verifyEmailContoller = require('../controllers/verifyEmailController')

router.route('/')
    .post(verifyEmailContoller.verifyEmail)  

module.exports = router