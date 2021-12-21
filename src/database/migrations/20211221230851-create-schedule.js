'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const SchedulesTable = queryInterface.createTable('Schedules', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            barber_name: {
                unique: true,
                allowNull: false,
                type: Sequelize.STRING,
            },
            barber_telephone: {
                unique: true,
                allowNull: false,
                type: Sequelize.STRING,
            },
            email: {
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

        return SchedulesTable;
    },

    down: async (queryInterface) => queryInterface.dropTable('Schedules'),
};
