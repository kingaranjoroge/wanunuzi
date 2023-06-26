'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add KRA Pin column
    await queryInterface.addColumn('Users', 'kraPin', {
      type: Sequelize.STRING,
      allowNull: true,
      after: 'phoneNumber' // Add after phoneNumber column
    });

    // Add DOB column
    await queryInterface.addColumn('Users', 'DOB', {
      type: Sequelize.DATE,
      allowNull: true,
      after: 'kraPin' // Add after kraPin column
    });

    // Add Gender column
    await queryInterface.addColumn('Users', 'Gender', {
      type: Sequelize.STRING,
      allowNull: true,
      after: 'DOB' // Add after DOB column
    });

    // Add Status column
    await queryInterface.addColumn('Users', 'Status', {
      type: Sequelize.STRING,
      allowNull: true,
      after: 'Gender' // Add after Gender column
    });

    // Add Address column
    await queryInterface.addColumn('Users', 'Address', {
      type: Sequelize.STRING,
      allowNull: true,
      after: 'Status' // Add after Status column
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'Address');
    await queryInterface.removeColumn('Users', 'Status');
    await queryInterface.removeColumn('Users', 'Gender');
    await queryInterface.removeColumn('Users', 'DOB');
  }
};
