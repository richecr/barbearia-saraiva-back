import DataTypes, { Sequelize } from 'sequelize';

import GenericModel, { DB } from './GenericModel';

export interface IPermission {
    id: number;
    name: string;
}

class Permission extends GenericModel {
    public id!: number;
    public name!: string;

    static associate(models: DB) {
        Permission.belongsToMany(models.User, { through: 'UserPermissions' });
    }

    static initModel(connection: Sequelize) {
        Permission.init(
            {
                name: {
                    allowNull: false,
                    type: DataTypes.STRING,
                }
            },
            {
                sequelize: connection,
                tableName: 'Permissions'
            },
        );
    }
}

export default Permission;
