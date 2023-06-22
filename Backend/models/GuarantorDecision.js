const { sequelize, DataTypes, Model } = require('./sequel');

class GuarantorDecision extends Model {}

GuarantorDecision.init({
    loanId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'loans',
            key: 'id'
        }
    },
    guarantorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    decision: {
        type: DataTypes.STRING,
        allowNull: true, // Allow null initially because the decision has not been made yet
        validate: {
            isIn: [['accepted', 'rejected']] // The decision can only be 'accepted' or 'rejected'
        }
    }
}, {
    sequelize,
    modelName: 'GuarantorDecision'
});

GuarantorDecision.associateModels = () => {
    const Loan = require('./Loan');
    const User = require('./User')

    GuarantorDecision.belongsTo(Loan, { foreignKey: 'loanId' });
    GuarantorDecision.belongsTo(User, { foreignKey: 'guarantorId' });
}

module.exports = GuarantorDecision;
