const { sequelize, DataTypes, Model } = require('./sequel');

class Guarantor extends Model {}

Guarantor.init({
    loanId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'loans',
            key: 'id'
        }
    },
    guarantor1: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    guarantor2: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    guarantor3: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'Guarantor'
});

Guarantor.associateModels = () => {
    const Loan = require('./Loan');
    const User = require('./User');
    const GuarantorDecision = require('./GuarantorDecision');

    Guarantor.belongsTo(Loan, { foreignKey: 'loanId' });
    Guarantor.belongsTo(User, { foreignKey: 'userId' });
    Guarantor.hasOne(GuarantorDecision, { foreignKey: 'guarantorId' });
}

module.exports = Guarantor