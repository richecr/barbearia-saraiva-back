import ScheduleRepository from '@repositories/ScheduleRepository';

import Schedule, { ISchedule } from '@models/Schedule';

import BaseService from './BaseService';

class ScheduleService extends BaseService<Schedule, ISchedule> {
}

export default new ScheduleService(ScheduleRepository);
