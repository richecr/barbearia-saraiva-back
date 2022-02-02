import User, { IUserSession } from '@models/User';

import BaseRepository from './BaseRepository';

class UserSessionRepository extends BaseRepository<User, IUserSession> {
}

export default new UserSessionRepository(User);