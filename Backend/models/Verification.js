const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('wanunuzi_db', 'root', '', {dialect: 'mariadb'});
class Verification extends Model {}

Verification.init({
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    mpesaReceiptNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    transactionDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    resultCode: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    resultDesc: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users', // 'User' refers to the table name
            key: 'id',
        },
    }
}, {
    sequelize,
    modelName: 'Verification'
});

const User = require('./User');

Verification.belongsTo(User, {foreignKey: 'userId', as: 'user'});

module.exports = { Verification };

