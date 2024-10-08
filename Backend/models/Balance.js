const { sequelize, DataTypes, Model } = require('./sequel');

const User = require("./User");

class Balance extends Model {}

    Balance.init({
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
            defaultValue: 1000.00,
        }
    }, {
        sequelize,
        modelName: 'Balance',
        tableName: 'balances'
    });

Balance.associateModels = () => {
    const User = require('./User');

    Balance.belongsTo(User, { foreignKey: 'userId' });
}

module.exports = Balance;