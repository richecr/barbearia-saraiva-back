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
        const dataWrapper = moment(new Date(), 'YYYY-MM-DD HH:mm:ss').utcOffset("-0300");
        const dateStart = dataWrapper.startOf("day").format();
        const dateEnd = dataWrapper.endOf("day").format();

        const schedules = await ScheduleService.findAll();
        const emailsPromises = schedules.map(async schedule => {
            let events = await EventService.find({
                where: {
                    schedule_id: schedule.id,
                    date_hour_start: {
                        [Op.between]: [dateStart, dateEnd]
                    },
                },
                include: [{ model: User, as: 'user'}]
            });
            return Mail.sendEmail({
                to: `${schedule.email}`,
                subject: 'Barbearia Saraiva: Sua Agenda de Hoje',
                template: 'schedule_day',
                context: {
                    barber_name: schedule?.barber_name,
                    events: events,
                },
            });
        });
        await Promise.allSettled(emailsPromises);
    }
}

export default new ScheduleToday();