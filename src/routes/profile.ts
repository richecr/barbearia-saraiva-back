import { Express } from 'express';
import { validateBodyDTO, validateParamsDTO } from '@middlewares/validateDTO';
import { UserCreate, UserUpdateAndDelete, UserUpdate } from '@dto/UserDTO';

import UserController from '@controllers/UserController';
import ensureAuth, { validateToken } from '@middlewares/ensureAuth';
import ProfileController from '@controllers/ProfileController';

// Add the route in file '_index.ts'
export default function routes(app: Express) {
    app.put(
        '/profile',
        validateToken(),
        validateParamsDTO(UserUpdateAndDelete),
        validateBodyDTO(UserUpdate),
        (req, res) => ProfileController.update(req, res),
    );
    app.get(
        '/profile',
        validateToken(),
        (req, res) => ProfileController.get(req, res),
    );
    app.delete(
        '/profile',
        validateToken(),
        validateParamsDTO(UserUpdateAndDelete),
        (req, res) => ProfileController.delete(req, res),
    );
}
