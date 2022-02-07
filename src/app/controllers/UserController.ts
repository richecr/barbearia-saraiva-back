import User, { IUser } from '@models/User';

import BaseController from './BaseController';
import UserService from '../services/UserService';
import { Request, Response } from 'express';
import BaseError from '../errors/BaseError';

class UserController extends BaseController<User, IUser> {
    async store(req: Request, res: Response) {
        try {
            const user_exists = await this.service.find({ where: {
                email: req.body.email
            }})
            if (user_exists.length > 0) {
                throw new BaseError("Email já cadastrado!", 400);
            }

            const user = await this.service.create(req.body);
            return res.status(201).json(user);
        } catch (error) {
            return res
                .status((error as BaseError).statusCode || 400)
                .json({ message: (error as BaseError).message });
        }
    }

}

export default new UserController(UserService);
