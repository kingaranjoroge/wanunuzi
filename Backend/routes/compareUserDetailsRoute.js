const express = require('express')
const router = express.Router()
const compareUserDetailsController = require('../controllers/compareUserDetailsController')

router.route('/:userId')
    .get(compareUserDetailsController.compareUserDetails)  

module.exports = router