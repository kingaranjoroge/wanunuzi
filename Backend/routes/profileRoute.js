const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profileController')

router.route('/:userId')
    .get(profileController.userProfile)
    .put(profileController.updateProfile)

module.exports = router