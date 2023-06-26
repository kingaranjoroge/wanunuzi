'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('NextOfKins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE',
      },
      Name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      DOB: {
        type: Sequelize.DATE,
        allowNull: false
      },
      ID_BirthCertificate: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      Phone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      Email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      kraPin: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('NextOfKins');
  }
};
