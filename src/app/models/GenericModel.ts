import { Model, Sequelize } from 'sequelize';

export interface DB {
    [key: string]: any;
}

export abstract class GenericModel extends Model {
    public static associate(models: DB): void {

    }

    public static initModel(connection: Sequelize): void {

    }
}

export default GenericModel;
