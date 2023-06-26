const Express = require("express");
const Router = Express.Router();
const { getLoanGuarantors, getLoanGuarantorsByLoanIdAndUserId } = require("../controllers/getLoanGuarantorsController");

Router.route("/:id")
    .get(getLoanGuarantors);

Router.route("/:userId/:loanId")
    .get(getLoanGuarantorsByLoanIdAndUserId);

module.exports = Router;