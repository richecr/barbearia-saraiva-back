import UserPermission, { IUserPermission } from '@models/UserPermission';

import BaseRepository from './BaseRepository';

class UserPermissionRepository extends BaseRepository<UserPermission, IUserPermission> {}

export default new UserPermissionRepository(UserPermission);