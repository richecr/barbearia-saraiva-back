import { Express } from 'express';
import { validateBodyDTO, validateParamsDTO } from '@middlewares/validateDTO';
import { ScheduleCreate, ScheduleUpdateAndDelete, ScheduleUpdate } from '@dto/ScheduleDTO';

import ScheduleController from '@controllers/ScheduleController';
import ensureAuth, { validateToken } from '@middlewares/ensureAuth';

// Add the route in file '_index.ts'
export default function routes(app: Express) {
    app.post(
        '/schedules',
        ensureAuth('ADMIN'),
        validateBodyDTO(ScheduleCreate),
        (req, res) => ScheduleController.store(req, res),
    );
    app.put(
        '/schedules/:id',
        ensureAuth('ADMIN'),
        validateParamsDTO(ScheduleUpdateAndDelete),
        validateBodyDTO(ScheduleUpdate),
        (req, res) => ScheduleController.update(req, res),
    );
    app.get(
        '/schedules',
        validateToken(),
        (req, res) => ScheduleController.index(req, res),
    );
    app.get(
        '/schedules/:id',
        validateToken(),
        (req, res) => ScheduleController.get(req, res),
    );
    app.delete(
        '/schedules/:id',
        ensureAuth('ADMIN'),
        validateParamsDTO(ScheduleUpdateAndDelete),
        (req, res) => ScheduleController.delete(req, res),
    );
}
