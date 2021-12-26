import UserPermissionRepository from '@repositories/UserPermissionRepository';

import UserPermission, { IUserPermission } from '@models/UserPermission';

import BaseService from './BaseService';

class UserPermissionService extends BaseService<UserPermission, IUserPermission> {}

export default new UserPermissionService(UserPermissionRepository);