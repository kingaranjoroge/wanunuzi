const Express = require("express");
const Router = Express.Router();
const { getAllGuarantorsForLoan } = require("../controllers/getAllGuarantorsForLoanController");

Router.route("/:loanId")
    .get(getAllGuarantorsForLoan);

module.exports = Router;