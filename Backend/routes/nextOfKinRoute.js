const express = require('express')
const router = express.Router()
const nextOfKinContoller = require('../controllers/nextOfKinController')

router.route('/').post(nextOfKinContoller.addNextOfKin) 
router.route('/:userId').get(nextOfKinContoller.getNextOfKin) 
router.route('/:userId').put(nextOfKinContoller.updateNextOfKin) 

module.exports = router