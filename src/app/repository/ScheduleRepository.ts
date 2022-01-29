import Schedule, { ISchedule } from '@models/Schedule';

import BaseRepository from './BaseRepository';

class ScheduleRepository extends BaseRepository<Schedule, ISchedule> {
}

export default new ScheduleRepository(Schedule);
