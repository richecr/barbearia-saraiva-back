import DataTypes, { Sequelize } from 'sequelize';

import GenericModel, { DB } from './GenericModel';

export interface ISchedule {
    id: number;
    barber_name: string;
    barber_telephone: string;
    email: string;
}

class Schedule extends GenericModel {
    public id!: number;
    public barber_name!: string;
    public barber_telephone!: string;
    public email!: string;

    static associate(models: DB) {
        Schedule.hasMany(models.Event, {
            foreignKey: 'schedule_id', as: 'Events'
        });
    }

    static initModel(connection: Sequelize) {
        Schedule.init(
            {
                barber_name: {
                    unique: true,
                    allowNull: false,
                    type: DataTypes.STRING,
                },
                barber_telephone: {
                    unique: true,
                    allowNull: false,
                    type: DataTypes.STRING,
                },
                email: {
                    unique: true,
                    allowNull: false,
                    type: DataTypes.STRING,
                },
            },
            {
                sequelize: connection,
                tableName: 'Schedules'
            },
        );
    }
}

export default Schedule;