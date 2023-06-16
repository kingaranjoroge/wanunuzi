const express = require('express')
const router = express.Router()
const usersContoller = require('../controllers/usersController')

router.route('/')
    .post(usersContoller.createUser)  

module.exports = router