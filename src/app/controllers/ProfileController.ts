import BaseController from './BaseController';
import User, { IUser } from '@models/User';
import UserService from '@services/UserService';
import { Request, Response } from 'express';
import BaseError from '../errors/BaseError';

class ProfileController extends BaseController<User, IUser> {

    async get(req: Request, res: Response): Promise<Response<IUser>> {
        try {
            const user = await this.service.findById(Number(req.user.id));
            if (user?.id != req.user.id) {
                throw new BaseError("Unauthorized", 401);
            }

            return res.status(200).json(user);
        } catch (error) {
            return res
                .status((error as BaseError).statusCode)
                .json({ message: (error as BaseError).message });
        }
    }

    async update(req: Request, res: Response): Promise<Response<IUser>> {
        try {
            const body = {...req.body, id: Number(req.user.id)};
            // TODO: adicionar validação no service. Criar um service ProfileService. 
            const event = await this.service.update(
                body.id,
                body,
            );
            return res.status(200).json(event);
        } catch (error) {
            return res
                .status((error as BaseError).statusCode)
                .json({ message: (error as BaseError).message });
        }
    }

}

export default new ProfileController(UserService);
