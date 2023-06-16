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
    guarantor1Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    guarantor2Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    guarantor3Id: {
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
    const User = require('./User')

    Guarantor.belongsTo(Loan, { foreignKey: 'loanId' });
    Guarantor.belongsTo(User, { foreignKey: 'guarantor1Id' });
    Guarantor.belongsTo(User, { foreignKey: 'guarantor2Id' });
    Guarantor.belongsTo(User, { foreignKey: 'guarantor3Id' });
}

module.exports = Guarantor