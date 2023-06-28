const express = require('express');
const router = express.Router();
const { getGuarantorDataByEmail } = require('../controllers/guarantorDataController');

router.route('/:email/:loanId')
    .get(getGuarantorDataByEmail);

module.exports = router;
