import { Express } from 'express';
import { validateBodyDTO } from '@middlewares/validateDTO';
import SessionCreate from '@dto/AuthDTO';

import AuthController from '@controllers/AuthController';
import ensureAuth, { isAdmin, validateToken } from '@middlewares/ensureAuth';

export default function routes(app: Express) {
    app.post(
        '/authenticate',
        validateBodyDTO(SessionCreate),
        (req, res) => AuthController.createToken(req, res),
    );

    app.get(
        '/user_admin',
        validateToken(),
        (req, res) => isAdmin(req, res),
    );
}