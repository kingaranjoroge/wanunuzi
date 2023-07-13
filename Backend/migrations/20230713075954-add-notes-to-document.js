'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'Documents', // name of Source model
        'notes', // name of the key we're adding
        {
          type: Sequelize.TEXT,
          allowNull: true,
        }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
        'Documents', // name of Source model
        'notes' // key we want to remove
    );
  }
};

