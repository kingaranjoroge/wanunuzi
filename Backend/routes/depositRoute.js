const express = require('express')
const router = express.Router()
const depositController = require('../controllers/depositController')

router.route('/')
    .post(depositController.deposit)

module.exports = router