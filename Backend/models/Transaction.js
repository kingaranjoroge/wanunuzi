const { sequelize, DataTypes, Model } = require('./sequel');

class Transaction extends Model {}

Transaction.init({
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
        transactionType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        timestamp: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
        }
    }, {
        sequelize,
        modelName: 'Transaction'
    });

Transaction.associateModels = () => {
    const User = require('./User');

    Transaction.belongsTo(User, { foreignKey: 'userId' });
}
module.exports = Transaction;
