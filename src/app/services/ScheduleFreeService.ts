import Event, { IEvent } from "@models/Event";
import EventRepository from "@repositories/EventRepository";
import { FindOptions, WhereOptions } from "sequelize/dist";

class ScheduleFreeService {

    private repositoryEvent = EventRepository;

    async find(filters: FindOptions<Event> = {}): Promise<IEvent[]> {
        const events = await this.repositoryEvent.find(filters);
        return events;
    }

}

export default new ScheduleFreeService();
