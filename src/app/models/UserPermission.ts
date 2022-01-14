import DataTypes, { Sequelize } from 'sequelize';

import GenericModel from './GenericModel';

export interface IUserPermission {
    id: number;
    user_id: number;
    permission_id: number;
}

class UserPermission extends GenericModel {
    public id!: number;
    public user_id!: number;
    public permission_id!: number;

    public static initModel(connection: Sequelize): void {
        UserPermission.init(
            {
                user_id: {
                    allowNull: false,
                    references: {
                        model: 'Users',
                        key: 'id',
                    },
                    type: DataTypes.INTEGER,
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                },
                permission_id: {
                    allowNull: false,
                    references: {
                        model: 'Permissions',
                        key: 'id',
                    },
                    type: DataTypes.INTEGER,
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                },
            },
            {
                sequelize: connection,
                tableName: 'UserPermissions',
            },
        );
    }
}

export default UserPermission;