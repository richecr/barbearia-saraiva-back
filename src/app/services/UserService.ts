import UserRepository from '@repositories/UserRepository';

import User, { IUser } from '@models/User';

import BaseService from './BaseService';

class UserService extends BaseService<User, IUser> {
}

export default new UserService(UserRepository);
