const { sequelize } = require('./sequel');

const User = require('./models/User');
const Balance = require('./models/Balance');
const Transaction = require('./models/Transaction');
const Loan = require('./models/Loan');
const Guarantor = require('./models/Guarantor')
const Savings = require('./models/Savings')

// initialize models
User.initModel(sequelize);
Balance.initModel(sequelize);
Transaction.initModel(sequelize);
Loan.initModel(sequelize);
Guarantor.initModel(sequelize)
Savings.initModel(sequelize)

// set up associations
User.associateModels();
Balance.associateModels();
Transaction.associateModels();
Loan.associateModels();
Guarantor.associateModels()
Savings.associateModels()

sequelize.sync()
    .then(() => console.log('Database synchronized'))
    .catch(error => console.error('Unable to sync the database:', error));
