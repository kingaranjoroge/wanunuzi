'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('GuarantorDecisions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      loanId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Loans',
          key: 'id'
        }
      },
      guarantorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      decision: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          isIn: [['accepted', 'rejected']]
        }
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
    await queryInterface.dropTable('GuarantorDecisions');
  }
};
