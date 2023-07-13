const { sequelize, DataTypes, Model } = require('./sequel');

class Document extends Model {}

Document.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        type: {
            type: DataTypes.ENUM('Payslip', 'Passport Photo', 'Identity Card - Front', 'Identity Card - Back', 'Registration Certificate', 'CRB Report', 'Address'),
            allowNull: false,
        },
        imagePath: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM('Verified', 'Pending', 'Rejected'),
            allowNull: false,
            defaultValue: 'Pending'
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'Document',
    }
);

Document.associateModels = () => {
    const User = require('./User');
    Document.belongsTo(User, { foreignKey: 'userId' });
};

module.exports = Document;