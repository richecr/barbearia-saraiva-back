'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const EventsTable = queryInterface.createTable('Events', {
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
            schedule_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Schedules',
                    key: 'id',
                },
                allowNull: false,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            date_hour_start: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            date_hour_end: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            type_service: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            duration_service: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            has_discount: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
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

        return EventsTable;
    },

    down: async (queryInterface) => queryInterface.dropTable('Events'),
};
