import moment from "moment";
import { Op } from "sequelize";
import { Request, Response } from "express";

import ScheduleFreeService from "@services/ScheduleFreeService";

interface ISchedule {
    from: string;
    of: string;
    status: string;
}

class ScheduleFreeController {

    private scheduleFreeService = ScheduleFreeService;

    private readonly HOUR_START = '08:00';
    private readonly HOUR_END = '19:00';

    async index(req: Request, res: Response) {
        try {
            const { schedule, date_start } = req.query as { [key: string]: string };
            const dt_moment = moment(new Date(date_start), 'YYYY-MM-DD').utcOffset("+0000");

            const schedulesDate = await this.scheduleFreeService.find({
                where: {
                    schedule_id: schedule,
                    date_hour_start: {
                        [Op.between]: [
                            dt_moment.startOf('day').toDate(),
                            dt_moment.endOf('day').toDate()
                        ]
                    }
                },
                order: [['date_hour_start', 'ASC']]
            });
            const schedulesBusy: ISchedule[] = schedulesDate.map(schBusy => {
                return {
                    from:  moment(schBusy.date_hour_start).utcOffset("+0000").format('HH:mm'),
                    of: moment(schBusy.date_hour_end).utcOffset("+0000").format('HH:mm'),
                    status: 'OCUPADO'
                }
            });

            const schedules: ISchedule[] = [...schedulesBusy];
            if (schedules.length === 0) {
                schedules.push({
                    from: this.HOUR_START,
                    of: this.HOUR_END,
                    status: "LIVRE"
                });
            }
            let schAux = '';
            schedulesBusy.forEach((schedule, idx) => {
                if (idx === 0 && schedule.from !== this.HOUR_START) {
                    schedules.push({
                        from: this.HOUR_START,
                        of: schedule.from,
                        status: "LIVRE"
                    });
                }

                if (schAux !== '' && schedule.from !== schAux) {
                    schedules.push({
                        from: schAux,
                        of: schedule.from,
                        status: "LIVRE"
                    });
                }
                schAux = schedule.of;

                if (idx === schedulesBusy.length - 1 && schedule.of !== this.HOUR_END) {
                    schedules.push({
                        from: schAux,
                        of: this.HOUR_END,
                        status: "LIVRE"
                    });
                }
            });
            schedules.sort((a, b) => a.from.localeCompare(b.from));

            return res.status(200).json(schedules);
        } catch (error) {
            return res.status(400).json({ message: 'Algum erro ocorreu!' });
        }
    }
}

export default new ScheduleFreeController();
