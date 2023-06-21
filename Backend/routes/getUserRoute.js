const express = require('express')
const router = express.Router()
const { getUser, getUserByEmail } = require('../controllers/getUserController')

router.route('/:id')
    .get(getUser)

router.route('/email/:email')
    .get(getUserByEmail)

module.exports = router
