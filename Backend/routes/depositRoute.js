const express = require('express')
const router = express.Router()
const depositContoller = require('../controllers/depositController')

router.route('/')
    .post(depositContoller.deposit)  

module.exports = router