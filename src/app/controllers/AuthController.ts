import { Request, Response } from 'express';

import AuthService from '../services/AuthService';

interface IToken {
    email: string;
    token: string;
}

class AuthController {
    private service: typeof AuthService;

    constructor(service: typeof AuthService) {
        this.service = service;
    }

    async createToken(req:Request, res: Response): Promise<Response<IToken>> {
        try {
            const tokenData = await this.service.createSession(req.body);
            return res.status(202).json(tokenData);
        } catch (error) {
            return res.status(401).json({ message: 'email ou senha errados' });
        }
    }
}

export default new AuthController(AuthService);