import Event from '@models/Event';
import User, { IUser } from '@models/User';
import { FindOptions } from 'sequelize';

import BaseRepository from './BaseRepository';

class UserRepository extends BaseRepository<User, IUser> {

    async find(filters: FindOptions<User> = {}): Promise<IUser[]> {
        const objects = await this.model.findAll<User>({
            ...filters,
            include: [{ model: Event, as: 'events'}]
        });
        return objects;
    }
}

export default new UserRepository(User);
