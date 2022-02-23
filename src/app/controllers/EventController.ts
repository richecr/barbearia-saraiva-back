import Event, { IEvent } from '@models/Event';

import BaseController from './BaseController';
import EventService from '../services/EventService';

class EventController extends BaseController<Event, IEvent> {
}

export default new EventController(EventService);
