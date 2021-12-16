import Sequelize, { FindOptions } from 'sequelize';
import BaseRepository from '@repositories/BaseRepository';

import BaseError from '../errors/BaseError';

class BaseService<T extends Sequelize.Model<T> & K, K> {
    public repository: BaseRepository<T, K>;

    constructor(repository: BaseRepository<T, K>) {
        this.repository = repository;
    }

    async create(body: any): Promise<K | BaseError> {
        const object = await this.repository.create(body);
        return object;
    }

    async findAll(): Promise<K[]> {
        const objects = await this.repository.findAll();
        return objects;
    }

    async findById(id: number): Promise<K | null> {
        const object = await this.repository.findById(id);
        if (!object) {
            throw new BaseError(`Object with ID = ${id} not found!`, 404);
        }

        return object;
    }

    async find(filters: FindOptions): Promise<K[]> {
        const objects = await this.repository.find(filters);
        return objects;
    }

    async delete(id: number): Promise<K | BaseError> {
        const object = await this.repository.delete(id);
        if (!object) {
            throw new BaseError(`Object with ID = ${id} not found!`, 404);
        }

        return object;
    }

    async update(id: number, bodyUpdated: any): Promise<K | BaseError | null> {
        const hasUpdated = await this.repository.update(id, bodyUpdated);
        if (!hasUpdated[0]) {
            throw new BaseError('Id not found!', 404);
        }

        const object = await this.repository.findById(id);
        return object;
    }
}

export default BaseService;
