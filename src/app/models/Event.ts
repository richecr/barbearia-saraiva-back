import DataTypes, { IntegerDataType, Sequelize } from 'sequelize';

import GenericModel, { DB } from './GenericModel';

export interface IEvent {
    id: number;
    user_id: number;
    schedule_id: number;
    date_hour_start: Date;
    date_hour_end: Date;
    type_service: string;
    duration_service: number;
}

class Event extends GenericModel {
    public id!: number;
    public user_id!: number;
    public schedule_id!: number;
    public date_hour_start!: Date;
    public date_hour_end!: Date;
    public type_service!: string;
    public duration_service!: number;

    static associate(models: DB) {
        Event.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'Users'
        });
        Event.belongsTo(models.Schedule, {
            foreignKey: 'schedule_id',
            as: 'Schedules'
        });
    }

    static initModel(connection: Sequelize) {
        Event.init(
            {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: DataTypes.INTEGER,
                },
                user_id: {
                    type: DataTypes.INTEGER,
                    references: {
                        model: 'Users',
                        key: 'id',
                    },
                    allowNull: false,
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                },
                schedule_id: {
                    type: DataTypes.INTEGER,
                    references: {
                        model: 'Schedules',
                        key: 'id',
                    },
                    allowNull: false,
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                },
                date_hour_start: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                date_hour_end: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                type_service: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                duration_service: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                }
            },
            {
                sequelize: connection,
                tableName: 'Event',
            },
        );
    }
}

export default Event;
