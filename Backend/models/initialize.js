// database.js
const { sequelize } = require('./sequel');
const User = require('./User');
const Role = require('./Role');
const Loan = require('./Loan');
const Guarantor = require('./Guarantor');
const Document = require('./Document');

User.associateModels();
Role.associateModels();
Loan.associateModels();
Guarantor.associateModels();
Document.associateModels();

module.exports = {
    sequelize,
    User,
    Role,
    Loan,
    Guarantor,
    Document,
};
