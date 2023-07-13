'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Documents', 'status', {
      type: Sequelize.ENUM('Verified', 'Pending', 'Rejected'),
      allowNull: false,
      defaultValue: 'Pending'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Documents', 'status');
  }
};
