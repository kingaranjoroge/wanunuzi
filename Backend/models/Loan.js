const { Sequelize }  = require('sequelize');

const { sequelize, DataTypes, Model } = require('./sequel');

class Loan extends Model {}

    Loan.init({
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        interestRate: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
        },
        dueDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'pending',
        }
    }, {
        sequelize,
        modelName: 'Loan'
    });
Loan.associateModels = () => {
    const User = require('./User');
    const Guarantor = require('./Guarantor');

    Loan.belongsTo(User, { foreignKey: 'userId' });
    Loan.hasMany(Guarantor, { foreignKey: 'loanId' });
}

module.exports = Loan;
