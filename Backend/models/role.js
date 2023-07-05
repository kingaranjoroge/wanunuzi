'use strict';
const { sequelize, DataTypes, Model } = require('./sequel');

  class Role extends Model {}

  Role.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }
  }, {
    sequelize,
    modelName: 'Role',
  });

  Role.associateModels = () => {
    const User = require('./User');
    Role.hasMany(User, { foreignKey: 'roleId' });
  };

  module.exports = Role;
