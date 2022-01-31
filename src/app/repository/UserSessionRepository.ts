import User, { IUserSession } from '@models/User';

import BaseRepository from './BaseRepository';

class UserRepository extends BaseRepository<User, IUserSession> {
}

export default new UserRepository(User);