import moment from 'moment';
import { Op } from 'sequelize';

import Mail from '@config/email';
import User from '@models/User';
import EventService from '@services/EventService';
import ScheduleService from '@services/ScheduleService';

class ScheduleToday {
    get key() {
        return 'ScheduleToday';
    }

    async handle() {
        const schedules = await ScheduleService.findAll();
        schedules.forEach(async schedule => {
            const date = moment(new Date(), 'YYYY-MM-DD HH:mm:ss +00:00').utcOffset("+0000");
            const events = await EventService.find({
                where: {
                    schedule_id: schedule.id,
                    date_hour_start: {
                        [Op.between]: [
                            date.startOf("day").format(),
                            date.endOf("day").format()
                        ]
                    },
                },
                include: [{ model: User, as: 'user'}]
            });
            await Mail.sendEmail({
                to: `${schedule.email}`,
                subject: 'Barbearia Saraiva: Sua Agenda de Hoje',
                template: 'schedule_day',
                context: {
                    barber_name: schedule?.barber_name,
                    events: events,
                },
            });
        });
    }
}

export default new ScheduleToday();