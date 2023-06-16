const express = require('express')
const router = express.Router()
const addGuarantorContoller = require('../controllers/addGuarantorController')

router.route('/')
    .post(addGuarantorContoller.addGuarantor)  

module.exports = router