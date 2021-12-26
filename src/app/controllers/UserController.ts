import User, { IUser } from '@models/User';

import BaseController from './BaseController';
import UserService from '../services/UserService';

class UserController extends BaseController<User, IUser> {
}

export default new UserController(UserService);
