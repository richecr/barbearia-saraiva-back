'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const UsersTable = queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            email: {
                allowNull: false,
                unique: true,
                type: Sequelize.STRING,
            },
            birthday: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            telephone: {
                type: Sequelize.STRING,
            },
            notification_whatsapp: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            notification_email: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            password_hash: {
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

        return UsersTable;
    },

    down: async (queryInterface) => queryInterface.dropTable('Users'),
};
