const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('wanunuzi_db', 'root', '', {dialect: 'mariadb'});

const User = require('./models/User');
const Balance = require('./models/Balance');
const Transaction = require('./models/Transaction');
const Loan = require('./models/Loan');

// initialize models
User.initModel(sequelize);
Balance.initModel(sequelize);
Transaction.initModel(sequelize);
Loan.initModel(sequelize);

// set up associations
User.associateModels();
Balance.associateModels();
Transaction.associateModels();
Loan.associateModels();

sequelize.sync()
    .then(() => console.log('Database synchronized'))
    .catch(error => console.error('Unable to sync the database:', error));
