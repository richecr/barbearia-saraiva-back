import EventTime, { IEventTime } from '@models/EventTime';

import BaseRepository from './BaseRepository';

class EventTimeRepository extends BaseRepository<EventTime, IEventTime> {

    public async findByName(eventName: string): Promise<IEventTime | null> {
        const event = await this.model.findOne<EventTime>({ where: { event_name: eventName } });
        return event;
    }

}

export default new EventTimeRepository(EventTime);
