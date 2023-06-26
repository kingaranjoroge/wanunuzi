const express = require('express')
const router = express.Router()
const nextOfKinContoller = require('../controllers/nextOfKinController')

router.route('/')
    .post(nextOfKinContoller.addNextOfKin) 

module.exports = router