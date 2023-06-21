const express = require('express')
const router = express.Router()
const guarantorDecisionController = require('../controllers/guarantorDecisionController')

router.route('/')
    .post(guarantorDecisionController.addDecision)

module.exports = router
