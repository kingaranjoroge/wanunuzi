// Assuming you have already set up Sequelize and established a connection to the database

const { sequelize, DataTypes, Model } = require('./sequel');

class Savings extends Model {}

Savings.init ({
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  balance: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
    sequelize,
    modelName: 'Savings'
});
Savings.associateModels = () => {
    const User = require('./User');

    Savings.belongsTo(User, { foreignKey: 'userId' });
}

module.exports = Savings;
