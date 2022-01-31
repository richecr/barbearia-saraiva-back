import { Express } from 'express';
import { validateBodyDTO } from '@middlewares/validateDTO';
import SessionDTO from '@dto/AuthDTO';

import AuthController from '@controllers/AuthController';

export default function routes(app: Express) {
    app.post(
        '/authenticate',
        validateBodyDTO(SessionDTO),
        (req, res) => AuthController.createToken(req, res),
    );
}