'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const EventTimesTable = queryInterface.createTable('EventTimes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            event_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            duration: {
                type: Sequelize.INTEGER,
                allowNull: false,
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

        return EventTimesTable;
    },

    down: async (queryInterface) => queryInterface.dropTable('EventTimes'),
};
