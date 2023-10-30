const express = require('express')
const router = express.Router()
const loginContoller = require('../controllers/loginController')

router.route('/')
    .post(loginContoller.loginUser) 

module.exports = router