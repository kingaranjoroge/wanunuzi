const { sequelize, DataTypes, Model } = require('./sequel');
class User extends Model {}

User.init(
    {
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        idNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        kraPin: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        DOB: {
            type: DataTypes.DATE,
            allowNull: true,            
        },
        Gender: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Status: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Address: {
            type: DataTypes.STRING,
            allowNull: true
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
    },
    {
        sequelize,
        modelName: 'User',
    }
);

module.exports = User;