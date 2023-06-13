const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('wanunuzi_db', 'root', '', {dialect: 'mariadb'});

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
    const User = require('./User')

    Guarantor.belongsTo(Loan, { foreignKey: 'loanId' });
    Guarantor.belongsTo(User, { foreignKey: 'guarantor1' });
    Guarantor.belongsTo(User, { foreignKey: 'guarantor2' });
    Guarantor.belongsTo(User, { foreignKey: 'guarantor3' });
}

module.exports = Guarantor