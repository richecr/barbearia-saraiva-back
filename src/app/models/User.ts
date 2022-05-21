import DataTypes, { Sequelize } from 'sequelize';
import * as bcrypt from 'bcrypt';

import GenericModel, { DB } from './GenericModel';
import Event from './Event';

export interface IUser {
    id: number;
    name: string;
    email: string;
    birthday: Date;
    telephone: string;
    number_services: number;
    notification_email: boolean;
    notification_whatsapp: boolean;
    events: Event[];
    checkPassword(password: string): Promise<boolean>;
}

export interface IUserSession {
    id: number;
    name: string;
    email: string;
    password_hash: string;
    checkPassword(password: string): Promise<boolean>;
}

class User extends GenericModel {
    public id!: number;
    public name!: string;
    public email!: string;
    public birthday!: Date;
    public password!: string;
    public telephone!: string;
    public password_hash!: string;
    public number_services!: number;
    public notification_email!: boolean;
    public notification_whatsapp!: boolean;
    public events!: Event[];

    public async checkPassword(password: string) {
        return await bcrypt.compare(password, this.password_hash);
    }

    static associate(models: DB) {
        User.belongsToMany(models.Permission, { through: 'UserPermissions' });
        User.hasMany(models.Event, { foreignKey: 'user_id', as: 'events' });
    }

    static initModel(connection: Sequelize) {
        User.init(
            {
                name: {
                    allowNull: false,
                    type: DataTypes.STRING,
                },
                email: {
                    allowNull: false,
                    unique: true,
                    type: DataTypes.STRING,
                },
                birthday: {
                    allowNull: false,
                    type: DataTypes.DATE,
                },
                telephone: {
                    type: DataTypes.STRING,
                },
                notification_whatsapp: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false,
                },
                notification_email: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false,
                },
                password: DataTypes.VIRTUAL,
                password_hash: {
                    type: DataTypes.STRING,
                },
                number_services: {
                    type: DataTypes.INTEGER,
                    defaultValue: 0,
                    validate: {
                        min: 0,
                    },
                }
            },
            {
                sequelize: connection,
                tableName: 'Users'
            },
        );
        User.beforeSave(async (user) => {
            if (user.password) {
                user.password_hash = await bcrypt.hash(user.password, 8);
            }
        });
    }
}

export default User;
