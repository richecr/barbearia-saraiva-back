import EventTime, { IEventTime } from '@models/EventTime';

import BaseController from './BaseController';
import EventTimeService from '../services/EventTimeService';

class EventTimeController extends BaseController<EventTime, IEventTime> {
}

export default new EventTimeController(EventTimeService);
