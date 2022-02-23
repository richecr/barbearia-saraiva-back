import EventRepository from '@repositories/EventRepository';

import Event, { IEvent } from '@models/Event';

import BaseService from './BaseService';

class EventService extends BaseService<Event, IEvent> {
}

export default new EventService(EventRepository);
