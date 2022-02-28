import moment from 'moment';
import { Request, Response } from 'express';

import EventService from '../services/EventService';
import BaseController from './BaseController';
import Event, { IEvent } from '@models/Event';
import BaseError from '../errors/BaseError';
import EventTimeService from '@services/EventTimeService';

class EventController extends BaseController<Event, IEvent> {

    private eventTimeService = EventTimeService

    async store(req: Request, res: Response) {
        try {
            let body = req.body;
            const user_id = req.user.id;

            const duration_service = await this.setDuration(body.type_service);
            const date_hour_end = moment(body.date_hour_start).add(duration_service, "minutes");
            const day = new Date(body.date_hour_start);
            const dataWrapper = moment(day, 'YYYY-MM-DD HH:mm:ss +00:00').utcOffset("+0000");

            body = { ...body, duration_service, date_hour_end, dataWrapper, user_id };
            const object = await this.service.create(body);
            return res.status(201).json(object);
        } catch (error) {
            return res
                .status((error as BaseError).statusCode || 400)
                .json({ message: (error as BaseError).message });
        }
    }

    public async setDuration(typeService: string) {
        const event = await this.eventTimeService.findByName(typeService);
        if (!event) {
            throw new BaseError("Tipo de Serviço indisponível.", 400);
        }

        return event?.duration;
    }

    async update(req: Request, res: Response): Promise<Response<IEvent>> {
        try {
            const body = {...req.body, user_id: req.user.id};
            const event = await this.service.update(
                Number(req.params.id),
                body,
            );
            return res.status(200).json(event);
        } catch (error) {
            return res
                .status((error as BaseError).statusCode)
                .json({ message: (error as BaseError).message });
        }
    }

    async get(req: Request, res: Response): Promise<Response<IEvent>> {
        try {
            const event = await this.service.findById(Number(req.params.id));
            if (event?.user_id != req.user.id) {
                throw new BaseError("Unauthorized", 401);
            }

            return res.status(200).json(event);
        } catch (error) {
            return res
                .status((error as BaseError).statusCode)
                .json({ message: (error as BaseError).message });
        }
    }

    async delete(req: Request, res: Response): Promise<Response<IEvent>> {
        try {
            const event = await this.service.findById(Number(req.params.id));
            if (event?.user_id != req.user.id) {
                throw new BaseError("Unauthorized", 401);
            }

            const eventDelete = await this.service.delete(Number(req.params.id));
            return res.status(200).json(eventDelete);
        } catch (error) {
            return res
                .status((error as BaseError).statusCode)
                .json({ message: (error as BaseError).message });
        }
    }

}

export default new EventController(EventService);
