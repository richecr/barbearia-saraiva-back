import moment from 'moment';
import { Op } from 'sequelize';

import BaseService from './BaseService';
import BaseError from '../errors/BaseError';
import Event, { IEvent } from '@models/Event';
import EventRepository from '@repositories/EventRepository';
import AuthService from './AuthService';


class EventService extends BaseService<Event, IEvent> {

    private authService = AuthService

    async validation(body: any, update: boolean = false) {
        let filters: any = {
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
        });

        return error;
    }

    async create(body: any): Promise<IEvent | BaseError> {
        const error = await this.validation(body);
        if (error) {
            throw new BaseError("Horário ocupado.", 409);
        } else {
            const event = await this.repository.create(body);
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
            modelInstance.save();
            return modelInstance;
        }
    }
}

export default new EventService(EventRepository);
