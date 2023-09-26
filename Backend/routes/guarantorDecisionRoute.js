const Express = require("express");
const Router = Express.Router();
const{ addDecision } = require("../controllers/guarantorDecisionController");

Router.route("/")
    .post(addDecision);

module.exports = Router;