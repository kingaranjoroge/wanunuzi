const express = require('express')
const router = express.Router()
const verifyEmailContoller = require('../controllers/verifyEmailController')

router.route('/')
    .post(verifyEmailContoller.verifyEmail)
    .get(verifyEmailContoller.verifyEmailGet); // add this line
module.exports = router