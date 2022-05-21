import moment from 'moment';
import { Op } from 'sequelize';
import { Request, Response } from 'express';

import EventService from '../services/EventService';
import BaseController from './BaseController';
import Event, { IEvent } from '@models/Event';
import BaseError from '../errors/BaseError';
import EventTimeService from '@services/EventTimeService';
import Schedule from '@models/Schedule';
import User from '@models/User';
import AuthService from '@services/AuthService';

class EventController extends BaseController<Event, IEvent> {

    private eventTimeService = EventTimeService

    private authService = AuthService

    private eventService = EventService

    async store(req: Request, res: Response) {
        try {
            const isUserAdmin = await this.authService.userIsAdmin(req.user.id);
            let body = {};
            if (isUserAdmin) {
                body = await this.makeBodyCreateAndUpdate(
                    { ...req.body }
                );
            } else {
                body = await this.makeBodyCreateAndUpdate(
                    { ...req.body, user_id: req.user.id }
                );
            }
            const object = await this.service.create(body);
            return res.status(201).json(object);
        } catch (error) {
            return res
                .status((error as BaseError).statusCode || 400)
                .json({ message: (error as BaseError).message });
        }
    }

    async update(req: Request, res: Response): Promise<Response<IEvent>> {
        try {
            const body = await this.makeBodyCreateAndUpdate(
                { ...req.body, id: req.params.id }
            );
            const event = await this.eventService.updateEvent(
                Number(req.params.id),
                body,
                req.user.id,
            );
            return res.status(200).json(event);
        } catch (error) {
            return res
                .status((error as BaseError).statusCode)
                .json({ message: (error as BaseError).message });
        }
    }

    public async makeBodyCreateAndUpdate(body: any) {
        const event_time = await this.getEventTime(body.type_service);
        const duration_service = event_time.duration;
        const date_hour_end = moment(body.date_hour_start).add(duration_service, "minutes");
        const day = new Date(body.date_hour_start);
        const dataWrapper = moment(day, 'YYYY-MM-DD HH:mm:ss +00:00').utcOffset("+0000");

        return { 
            ...body,
            type_service: event_time.event_name,
            duration_service,
            date_hour_end,
            dataWrapper
        };
    }

    public async getEventTime(serviceId: number) {
        const event = await this.eventTimeService.findById(serviceId);
        if (!event) {
            throw new BaseError("Tipo de Serviço indisponível.", 400);
        }

        return event;
    }

    async get(req: Request, res: Response): Promise<Response<IEvent>> {
        try {
            const event = await this.service.findById(Number(req.params.id));
            const isUserAdmin = await this.authService.userIsAdmin(req.user.id);
            if (!isUserAdmin && event?.user_id != req.user.id) {
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
            const isUserAdmin = await this.authService.userIsAdmin(req.user.id);
            if (!isUserAdmin && event?.user_id != req.user.id) {
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

    async index(req: Request, res: Response): Promise<Response<IEvent[]>> {
        try {
            const isUserAdmin = await this.authService.userIsAdmin(req.user.id);
            let where = {};
            if (!isUserAdmin) {
                where = { user_id: req.user.id };
            }
            if (req.query.dt_start) {
                const date = req.query.dt_start as string;
                const dt_start = new Date(date);
                const dt_moment = moment(dt_start, 'YYYY-MM-DD').utcOffset("+0000");
                where = {
                    ...where,
                    date_hour_start: {
                        [Op.between]: [
                            dt_moment.startOf('day').toDate(),
                            dt_moment.endOf('day').toDate()
                        ],
                    }
                };
            }

            const events = await this.service.find({
                where,
                include: [
                    { model: Schedule, as: 'schedule'},
                    { model: User, as: 'user'}
                ],
                order: [['date_hour_start', 'ASC']]
            });
            return res.status(200).json(events);
        } catch (error) {
            return res
                .status((error as BaseError).statusCode || 400)
                .json({ message: (error as BaseError).message });
        }
    }
}

export default new EventController(EventService);
