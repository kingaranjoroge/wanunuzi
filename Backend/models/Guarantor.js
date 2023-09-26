const { Sequelize } = require("sequelize");
const { sequelize, DataTypes, Model } = require('./sequel');

class Guarantor extends Model {}

Guarantor.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        loanId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'loans',
                key: 'id',
            },
        },
        guaranteeAmount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        decision: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'pending',
        },
        creationDate: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW,
        },
        modificationDate: {
            type: DataTypes.DATE,
        },
    },
    {
        sequelize,
        modelName: 'Guarantor',
    }
);

Guarantor.associateModels = () => {
    const User = require('./User');
    const Loan = require('./Loan');

    Guarantor.belongsTo(User, { foreignKey: 'userId' });
    Guarantor.belongsTo(Loan, { foreignKey: 'loanId' });
};

module.exports = Guarantor;
