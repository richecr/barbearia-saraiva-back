import { Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import auth from '@config/auth';
import BaseError from '../errors/BaseError';
import PermissionService from '@services/PermissionService';
import UserPermissionService from '@services/UserPermissionService';

interface TokenPayload {
    iat?: number | undefined;
    exp?: number | undefined;
    sub?: number | undefined;
}

export async function isAdmin(request: any, response: Response) {
    const [{ id }] = await PermissionService.repository.findByFilters(
        { name: 'ADMIN' },
    );
    const checkUserPermission = await UserPermissionService.repository.findByFilters(
        {
            user_id: request.user.id,
            permission_id: id,
        },
    );

    return response.status(200).json({is_admin: checkUserPermission.length > 0});
}

export function validateToken() {
    return async (request: any, response: Response, next: NextFunction) => {
        try {
            const authHeader = request.headers.authorization;
            if (!authHeader) {
                response.status(401).json({ message: 'Unauthorized' });
                return;
            }
    
            const [, token] = authHeader.split(' ');
            const decoded = verify(token, auth.jwt.secret) as TokenPayload;
    
            request.user = {
                id: decoded.sub,
            };
    
            return next();
        } catch {
            response.status(401).json({ message: 'Unauthorized' });
        }
    };
}

export default function ensureAuth(permissionName: string) {
    return async (request: any, response: Response, next: NextFunction) => {
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            response.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const [, token] = authHeader.split(' ');

        try {
            const decoded = verify(token, auth.jwt.secret) as TokenPayload;
            const [{ id }] = await PermissionService.repository.findByFilters(
                { name: permissionName },
            );
            const checkUserPermission = await UserPermissionService.repository.findByFilters(
                {
                    user_id: Number(decoded.sub),
                    permission_id: id,
                },
            );

            if (!checkUserPermission[0]) {
                throw new BaseError('Você não tem permissão de acesso para essa tela.', 401);
            }

            request.user = {
                id: decoded.sub,
            };

            return next();
        } catch {
            response.status(401).json({ message: 'Unauthorized' });
        }
    };
}
