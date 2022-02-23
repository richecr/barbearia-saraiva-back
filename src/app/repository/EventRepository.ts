import Event, { IEvent } from '@models/Event';

import BaseRepository from './BaseRepository';

class EventRepository extends BaseRepository<Event, IEvent> {
}

export default new EventRepository(Event);
