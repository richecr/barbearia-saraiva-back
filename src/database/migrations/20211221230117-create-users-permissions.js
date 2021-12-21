'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const UserPermissionsTable = queryInterface.createTable(
            'UserPermissions',
            {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                user_id: {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'Users',
                        key: 'id',
                    },
                    allowNull: false,
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                },
                permission_id: {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'Permissions',
                        key: 'id',
                    },
                    allowNull: false,
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                },
                created_at: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
                updated_at: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
            },
        );

        return UserPermissionsTable;
    },

    down: async (queryInterface) => queryInterface.dropTable('UserPermissions'),
};
