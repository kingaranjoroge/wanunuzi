'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Guarantors', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            loanId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Loans',
                    key: 'id',
                },
                allowNull: false,
            },
            userId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Users',
                    key: 'id',
                },
                allowNull: false,
            },
            guaranteeAmount: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            decision: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: 'pending',
            },
            creationDate: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            modificationDate: {
                type: Sequelize.DATE,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Guarantors');
    },
};
