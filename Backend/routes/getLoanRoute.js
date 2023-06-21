const express = require('express')
const router = express.Router()
const getLoanController = require('../controllers/getLoanController')

router.route('/:id')
    .get(getLoanController.getLoan)

module.exports = router