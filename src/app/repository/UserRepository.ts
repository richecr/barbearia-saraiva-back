import User, { IUser } from '@models/User';

import BaseRepository from './BaseRepository';

class UserRepository extends BaseRepository<User, IUser> {
}

export default new UserRepository(User);
