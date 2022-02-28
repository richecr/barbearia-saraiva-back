import EventTimeRepository from '@repositories/EventTimeRepository';

import BaseService from './BaseService';
import EventTime, { IEventTime } from '@models/EventTime';

class EventTimeService extends BaseService<EventTime, IEventTime> {

    repository = EventTimeRepository;

    public async findByName(eventName: string): Promise<IEventTime | null> {
        const event = await this.repository.findByName(eventName);
        return event;
    }

}

export default new EventTimeService(EventTimeRepository);
