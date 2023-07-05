// database.js
const { sequelize } = require('./sequel');
const User = require('./User');
const Role = require('./Role');

User.associateModels();
Role.associateModels();

module.exports = {
    sequelize,
    User,
    Role,
};
