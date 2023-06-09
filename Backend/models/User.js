const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('wanunuzi_db', 'root', '', {dialect: 'mariadb'});

class User extends Model {}

User.init({
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    emailVerificationToken: {
        type: DataTypes.STRING,
    },
    emailVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    accountActivated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize,
    modelName: 'User'
});

module.exports = User;