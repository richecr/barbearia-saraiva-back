import { Express } from 'express';
import { validateBodyDTO, validateParamsDTO } from '@middlewares/validateDTO';
import { UserCreate, UserUpdateAndDelete, UserUpdate } from '@dto/UserDTO';

import UserController from '@controllers/UserController';

// Add the route in file '_index.ts'
export default function routes(app: Express) {
    app.post(
        '/users',
        validateBodyDTO(UserCreate),
        (req, res) => UserController.store(req, res),
    );
    app.put(
        '/users/:id',
        validateParamsDTO(UserUpdateAndDelete),
        validateBodyDTO(UserUpdate),
        (req, res) => UserController.update(req, res),
    );
    app.get(
        '/users',
        (req, res) => UserController.index(req, res),
    );
    app.get(
        '/users/:id',
        (req, res) => UserController.get(req, res),
    );
    app.delete(
        '/your_route/:id',
        validateParamsDTO(UserUpdateAndDelete),
        (req, res) => UserController.delete(req, res),
    );
}
