import Schedule, { ISchedule } from '@models/Schedule';

import BaseController from './BaseController';
import ScheduleService from '../services/ScheduleService';

class ScheduleController extends BaseController<Schedule, ISchedule> {
}

export default new ScheduleController(ScheduleService);
