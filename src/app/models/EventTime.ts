import DataTypes, { Sequelize } from 'sequelize';

import GenericModel, { DB } from './GenericModel';

export interface IEventTime {
    id: number;
    event_name: string;
    duration: number;
}

class EventTime extends GenericModel {
    public id!: number;
    public event_name!: string;
    public duration!: number;

    static initModel(connection: Sequelize) {
        EventTime.init(
            {
                event_name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                duration: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                }
            },
            {
                sequelize: connection,
                tableName: 'EventTimes'
            },
        );
    }
}

export default EventTime;