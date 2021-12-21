'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const PermissionsTable = queryInterface.createTable('Permissions', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                unique: true,
                allowNull: false,
                type: Sequelize.STRING,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });

        return PermissionsTable;
    },

    down: async (queryInterface) => queryInterface.dropTable('Permissions'),
};
