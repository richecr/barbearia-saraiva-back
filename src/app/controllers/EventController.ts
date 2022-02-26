import moment from 'moment';
import { Request, Response } from 'express';

import EventService from '../services/EventService';
import BaseController from './BaseController';
import Event, { IEvent } from '@models/Event';
import BaseError from '../errors/BaseError';

class EventController extends BaseController<Event, IEvent> {

    async store(req: Request, res: Response) {
        try {
            let body = req.body;
            const duration = this.setDuration(body.type_service);
            const date_hour_end = moment(body.date_hour_start).add(duration, "minutes");
            const data = { ...body, duration, date_hour_end };
            const day = new Date(body.date_hour_start);
            const dataWrapper = moment(day, 'YYYY-MM-DD HH:mm:ss +00:00').utcOffset("+0000");
            body = { ...data, dataWrapper };

            const object = await this.service.create(body);
            return res.status(201).json(object);
        } catch (error) {
            return res
                .status((error as BaseError).statusCode || 400)
                .json({ message: (error as BaseError).message });
        }
    }

    public setDuration(typeService: string) {
        return 30;
    }

}

export default new EventController(EventService);
