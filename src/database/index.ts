import 'dotenv/config';
import { Sequelize } from 'sequelize';
import fs from 'fs';
import path from 'path';

import { DB } from '@models/GenericModel';

import { development, production, test } from '../config/database.json';

const basename = path.resolve(__dirname, '../app/models/');
const db: DB = {};

const variables_db = process.env.NODE_ENV === 'test'
    ? test
    : process.env.NODE_ENV === 'dev' ? development : production;

class Database {
    public connection: Sequelize;

    constructor() {
        this.connection = this.init();
        this.loadModels();
    }

    init() {
        // @ts-ignore
        return new Sequelize(variables_db);
    }

    loadModels() {
        fs.readdirSync(basename)
            .filter(
                (file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.ts',
            )
            .forEach((file) => {
                // O require foi usado para importar os models dinamicamente.
                // Não é uma boa prática, mas foi a única forma que conseguimos.
                const model = require(path.join(basename, file));
                model.default.initModel(this.connection);
                db[model.default.name] = model.default;
            });

        Object.keys(db).forEach((model) => {
            db[model].associate(db);
        });
    }
}

export default new Database();
