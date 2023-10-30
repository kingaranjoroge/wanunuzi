const { sequelize, DataTypes, Model } = require('./sequel');

class NextOfKin extends Model {}

NextOfKin.init(
  {
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    DOB: {
      type: DataTypes.DATE,
      allowNull: false
    },
    ID_BirthCertificate: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    kraPin: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: 'NextOfKin',
  }
);

NextOfKin.associateModels = () => {
    const User = require('./User');

    NextOfKin.belongsTo(User, { foreignKey: 'userId' });
};

module.exports = NextOfKin;
