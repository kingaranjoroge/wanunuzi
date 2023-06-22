const express = require('express')
const router = express.Router()
const savingsDashBoardController = require('../controllers/savingsDashBoardController')

router.route('/:userId')
    .get(savingsDashBoardController.getSavingsData)  

module.exports = router