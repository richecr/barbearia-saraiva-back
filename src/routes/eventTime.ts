import { Express } from 'express';
import { validateBodyDTO, validateParamsDTO } from '@middlewares/validateDTO';
import { EventCreate, EventUpdateAndDelete, EventUpdate } from '@dto/EventDTO';

import EventTimeController from '@controllers/EventTimeController';
import ensureAuth, { validateToken } from '@middlewares/ensureAuth';

// Add the route in file '_index.ts'
export default function routes(app: Express) {
    app.post(
        '/events_times',
        ensureAuth("ADMIN"),
        validateBodyDTO(EventCreate),
        (req, res) => EventTimeController.store(req, res),
    );
    app.put(
        '/events_times/:id',
        ensureAuth("ADMIN"),
        validateParamsDTO(EventUpdateAndDelete),
        validateBodyDTO(EventUpdate),
        (req, res) => EventTimeController.update(req, res),
    );
    app.get(
        '/events_times',
        validateToken(),
        (req, res) => EventTimeController.index(req, res),
    );
    app.get(
        '/events_times/:id',
        validateToken(),
        (req, res) => EventTimeController.get(req, res),
    );
    app.delete(
        '/events_times/:id',
        ensureAuth("ADMIN"),
        validateParamsDTO(EventUpdateAndDelete),
        (req, res) => EventTimeController.delete(req, res),
    );
}
