import Permission, { IPermission } from '@models/Permission';

import BaseRepository from './BaseRepository';

class PermissionRepository extends BaseRepository<Permission, IPermission> {
}

export default new PermissionRepository(Permission);
