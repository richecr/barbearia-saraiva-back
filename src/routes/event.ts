import { Express } from 'express';
import { validateBodyDTO, validateParamsDTO } from '@middlewares/validateDTO';
import { EventCreate, EventUpdateAndDelete, EventUpdate } from '@dto/EventDTO';

import EventController from '@controllers/EventController';
import ensureAuth, { validateToken } from '@middlewares/ensureAuth';

// Add the route in file '_index.ts'
export default function routes(app: Express) {
    app.post(
        '/events',
        validateToken(),
        validateBodyDTO(EventCreate),
        (req, res) => EventController.store(req, res),
    );
    app.put(
        '/events/:id',
        validateToken(),
        validateParamsDTO(EventUpdateAndDelete),
        validateBodyDTO(EventUpdate),
        (req, res) => EventController.update(req, res),
    );
    app.get(
        '/events',
        ensureAuth('ADMIN'),
        (req, res) => EventController.index(req, res),
    );
    app.get(
        '/events/:id',
        validateToken(),
        (req, res) => EventController.get(req, res),
    );
    app.delete(
        '/events/:id',
        validateToken(),
        validateParamsDTO(EventUpdateAndDelete),
        (req, res) => EventController.delete(req, res),
    );
}
