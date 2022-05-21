import 'dotenv/config';
import moment from 'moment';
import { Op } from 'sequelize';

import BaseService from './BaseService';
import AuthService from './AuthService';
import BaseError from '../errors/BaseError';
import UpdateEventEmail from '../jobs/UpdateEventEmail';

import User from '@models/User';
import Schedule from '@models/Schedule';
import Event, { IEvent } from '@models/Event';
import EventRepository from '@repositories/EventRepository';
import UserRepository from '@repositories/UserRepository';
import ScheduleRepository from '@repositories/ScheduleRepository';
import NewUpdateEvent from '../jobs/NewUpdateEvent';

class EventService extends BaseService<Event, IEvent> {

    private authService = AuthService
    private updateEventEmail = UpdateEventEmail
    private userRepository = UserRepository
    private scheduleRepository = ScheduleRepository


    async validation(body: any, update: boolean = false) {
        let filters: any = {
            schedule_id: body.schedule_id,
            date_hour_start: {
                [Op.between]: [
                    body.dataWrapper.startOf("day").format(),
                    body.dataWrapper.endOf("day").format()
                ]
            },
        };
        if (update) {
            filters = {
                ...filters,
                id: {
                    [Op.not]: body.id
                }
            }
        }

        const events = await this.repository.findByFilters(filters);

        let error = false;
        events.map((apt) => {
            if (moment(body.date_hour_start).isSame(moment(apt.date_hour_start))) {
                error = true;
            }

            if (
                moment(body.date_hour_start).isBetween(
                moment(apt.date_hour_start),
                moment(apt.date_hour_end)
            )
            ) {
                error = true;
            }

            if (
                body.date_hour_end.isBetween(moment(apt.date_hour_start), moment(apt.date_hour_end))
            ) {
                error = true;
            }

            if (body.date_hour_end.isSame(moment(apt.date_hour_end))) {
                error = true;
            }

            if (moment(body.date_hour_start).isBefore(apt.date_hour_start)
                && moment(body.date_hour_end).isAfter(moment(apt.date_hour_end))
                ) {
                error = true;
            }
        });

        return error;
    }

    async applyDiscount(body: any) {
        const user =  await this.userRepository.findById(body.user_id);
        const userIsAdmin = await this.authService.userIsAdmin(body.user_id);
        if (!userIsAdmin) {
            if (user) {
                const qnt = process.env.QNT_SERVICES_TO_DISCOUNT;
                if ((user?.number_services + 1) % qnt === 0) {
                    body.has_discount = true;
                }
            }
        }
        await this.userRepository.incrementNumberServices(body.user_id);
    }

    async create(body: any): Promise<IEvent | BaseError> {
        const error = await this.validation(body);
        if (error) {
            throw new BaseError("Horário ocupado.", 409);
        } else {
            await this.applyDiscount(body);
            const event = await this.repository.create(body);
            NewUpdateEvent.handle(event);
            return event;
        }
    }

    async updateEvent(id: number, bodyUpdated: any, userId: number | undefined): Promise<IEvent | BaseError | null> {
        const modelInstance = await this.repository.findById(id);
        if (!modelInstance) {
            throw new BaseError('Id not found!', 404);
        }
        const isUserAdmin = await this.authService.userIsAdmin(userId);
        if (!isUserAdmin && modelInstance?.user_id != userId) {
            throw new BaseError("Unauthorized", 401);
        }

        const error = await this.validation(bodyUpdated, true);
        if (error) {
            throw new BaseError("Horário ocupado.", 409);
        } else {
            modelInstance.set(bodyUpdated);
            const event = await modelInstance.save();
            if (isUserAdmin) {
                const user = await this.userRepository.findById(modelInstance.user_id);
                const schedule = await this.scheduleRepository.findById(modelInstance.schedule_id);
                try {
                    this.sendEmail(modelInstance, user, schedule);
                } catch (error) {
                    console.error("E-mail não enviado! Motivo: ", error)
                }
            }
            NewUpdateEvent.handle(event);
            return modelInstance;
        }
    }

    async sendEmail(event: Event, user: User | null, schedule: Schedule | null) {
        if (user?.notification_email) {
            await this.updateEventEmail.handle(event, user, schedule);
        }
    }
}

export default new EventService(EventRepository);
