import Sequelize, { FindOptions, WhereOptions } from 'sequelize';

class BaseRepository<T extends Sequelize.Model<T> & K, K> {
    public model: { new (): T } & typeof Sequelize.Model;

    constructor(model: { new (): T } & typeof Sequelize.Model) {
        this.model = model;
    }

    public async create(attributes: any): Promise<K> {
        const object = await this.model.create<T>(attributes);
        return object;
    }

    async findAll(): Promise<K[]> {
        const objects = this.model.findAll<T>();
        return objects;
    }

    async findByFilters(where: WhereOptions<T> = {}): Promise<K[]> {
        const objects = this.model.findAll<T>({ where });
        return objects;
    }

    async find(filters: FindOptions<T> = {}): Promise<K[]> {
        const objects = this.model.findAll<T>(filters);
        return objects;
    }

    async findById(id: number): Promise<K | null> {
        const object = await this.model.findByPk<T>(id);
        return object;
    }

    public async update(
        id: number,
        attributes: Partial<K>,
    ): Promise<[number, any[]]> {
        const objectUpdated = await this.model.update(attributes, {
            where: { id },
        });
        return objectUpdated;
    }

    async delete(id: number): Promise<K | null> {
        const object = await this.findById(id);
        if (object) {
            await this.model.destroy({ where: { id } });
        }

        return object;
    }
}

export default BaseRepository;
