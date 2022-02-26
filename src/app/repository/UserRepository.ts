import Event from '@models/Event';
import User, { IUser } from '@models/User';

import BaseRepository from './BaseRepository';

class UserRepository extends BaseRepository<User, IUser> {

    async find(): Promise<IUser[]> {
        const objects = await this.model.findAll<User>({
            include: [{ model: Event, as: 'events'}]
        });
        return objects;
    }
}

export default new UserRepository(User);
