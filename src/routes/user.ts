import { Express } from 'express';
import { validateBodyDTO, validateParamsDTO } from '@middlewares/validateDTO';
import { UserCreate, UserUpdateAndDelete, UserUpdate } from '@dto/UserDTO';

import UserController from '@controllers/UserController';
import ensureAuth from '@middlewares/ensureAuth';

// Add the route in file '_index.ts'
export default function routes(app: Express) {
    app.post(
        '/users',
        ensureAuth('ADMIN'),
        validateBodyDTO(UserCreate),
        (req, res) => UserController.store(req, res),
    );
    app.put(
        '/users/:id',
        ensureAuth('ADMIN'),
        validateParamsDTO(UserUpdateAndDelete),
        validateBodyDTO(UserUpdate),
        (req, res) => UserController.update(req, res),
    );
    app.get(
        '/users',
        ensureAuth('ADMIN'),
        (req, res) => UserController.index(req, res),
    );
    app.get(
        '/users/:id',
        ensureAuth('ADMIN'),
        (req, res) => UserController.get(req, res),
    );
    app.delete(
        '/users/:id',
        ensureAuth('ADMIN'),
        validateParamsDTO(UserUpdateAndDelete),
        (req, res) => UserController.delete(req, res),
    );
}
