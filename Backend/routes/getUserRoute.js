const express = require('express')
const router = express.Router()
const getUserContoller = require('../controllers/getUserController')

router.route('/:id')
    .get(getUserContoller.getUser)  

module.exports = router