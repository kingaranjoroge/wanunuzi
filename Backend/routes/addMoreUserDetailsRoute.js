const express = require('express')
const router = express.Router()
const addMoreUserDetailsController = require('../controllers/addMoreUserDetailsController')

router.route('/')
    .post(addMoreUserDetailsController.moreUserDetails)  

module.exports = router