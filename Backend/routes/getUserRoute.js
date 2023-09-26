const express = require('express')
const router = express.Router()
const { getUser, getUserByEmail, getBalanceByEmail, getBalanceById } = require('../controllers/getUserController')

router.route('/:id')
    .get(getUser)

router.route('/email/:email')
    .get(getUserByEmail)

router.route('/:id/balance')
    .get(getBalanceById)

router.route('/email/:email/balance')
    .get(getBalanceByEmail)

module.exports = router
