'use strict';

module.exports = {
up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Guarantors', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        loanId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Loans',
                key: 'id'
        },
            allowNull: false
        },
        guarantor1: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        guarantor2: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        guarantor3: {
            type: Sequelize.INTEGER,
            allowNull: false
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
await queryInterface.dropTable('Guarantors');
}
};