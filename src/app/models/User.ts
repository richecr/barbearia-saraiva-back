import DataTypes, { Sequelize } from 'sequelize';
import * as bcrypt from 'bcrypt';

import GenericModel, { DB } from './GenericModel';

export interface IUser {
    id: number;
    name: string;
    email: string;
    birthday: Date;
    telephone: string;
    notification_email: boolean;
    notification_whatsapp: boolean;
}

export interface IUserSession {
    id: number;
    name: string;
    email: string;
    password_hash: string;
}

class User extends GenericModel {
    public id!: number;
    public name!: string;
    public email!: string;
    public birthday!: Date;
    public password!: string;
    public telephone!: string;
    public password_hash!: string;
    public notification_email!: boolean;
    public notification_whatsapp!: boolean;

    async checkPassword(password: string) {
        return await bcrypt.compare(password, this.password_hash);
    }

    static associate(models: DB) {
        User.belongsToMany(models.Permission, { through: 'UserPermissions' });
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
