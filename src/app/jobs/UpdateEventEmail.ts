import Mail from '@config/email';
import Event from '@models/Event';
import Schedule from '@models/Schedule';
import User from '@models/User';

class UpdateEventEmail {
    get key() {
        return 'UpdateEventEmail';
    }

    async handle(event: Event, user: User, schedule: Schedule | null) {
        await Mail.sendEmail({
            to: `${user.email}`,
            subject: 'Barbearia Saraiva: Evento alterado',
            template: 'update_event',
            context: {
                username: user.name,
                barber_name: schedule?.barber_name,
                type_service: event.type_service,
                date_hour_end: event.date_hour_end,
                date_hour_start: event.date_hour_start,

            },
        });
    }
}

export default new UpdateEventEmail();