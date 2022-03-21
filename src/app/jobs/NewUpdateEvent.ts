import moment from 'moment';

import Mail from '@config/email';
import ScheduleService from '@services/ScheduleService';
import { IEvent } from '@models/Event';
import UserService from '@services/UserService';

class NewUpdateEvent {
    get key() {
        return 'NewUpdateEvent';
    }

    async handle(event: IEvent) {
        const dataWrapper = moment(new Date(), 'YYYY-MM-DD').utcOffset("-0300");
        const dateStart = moment(event.date_hour_start, 'YYYY-MM-DD');

        if (dataWrapper.isSame(dateStart, 'day')) {
            const schedule = await ScheduleService.findById(event.schedule_id);
            const user = await UserService.findById(event.user_id);
            const eventEmail: any = event;
            eventEmail.user = user
            Mail.sendEmail({
                to: `${schedule?.email}`,
                subject: 'Barbearia Saraiva: Alteração na Agenda de Hoje',
                template: 'new_update_event',
                context: {
                    barber_name: schedule?.barber_name,
                    events: [eventEmail],
                },
            });
        }
    }
}

export default new NewUpdateEvent();