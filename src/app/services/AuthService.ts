import bcryptjs from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import auth from '@config/auth';
import UserSessionRepository from '@repositories/UserSessionRepository';

import BaseError from '../errors/BaseError';

export interface ISession {
    email: string;
    token: string;
}

class AuthService {
    private repository: typeof UserSessionRepository;

    constructor(repository: typeof UserSessionRepository) {
        this.repository = repository;
    }

    async createSession({ email, password }: any): Promise<ISession> {
        const user = (await this.repository.findByFilters({ email }))[0];
        if (!user) {
            throw new BaseError(`Object with email: ${email} not found`, 404);
        }

        const passwordMatched = await bcryptjs.compare(
            password,
            user.password_hash,
        );

        if (!passwordMatched) {
            throw new BaseError('Invalid Password', 401);
        }

        const token = sign({}, auth.jwt.secret, {
            subject: String(user.id),
            expiresIn: auth.jwt.expiresIn,
        });

        return { email: user.email, token };
    }
}

export default new AuthService(UserSessionRepository);