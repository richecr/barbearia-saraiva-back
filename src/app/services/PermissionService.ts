import PermissionRepository from '@repositories/PermissionRepository';

import Permission, { IPermission } from '@models/Permission';

import BaseService from './BaseService';

class PermissionService extends BaseService<Permission, IPermission> {
}

export default new PermissionService(PermissionRepository);
