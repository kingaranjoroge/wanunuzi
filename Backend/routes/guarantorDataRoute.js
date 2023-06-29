const express = require('express');
const router = express.Router();
const { getGuarantorDataByEmail, getGuaranteeAmountById } = require('../controllers/guarantorDataController');

router.route('/:email/:loanId')
    .get(getGuarantorDataByEmail);

//get guarantee amount by id
router.route('/:id')
    .get(getGuaranteeAmountById);

module.exports = router;
