import 'dotenv/config';
import express, { Express } from 'express';
import cors from 'cors';
import schedule from 'node-schedule';

import routes from './routes/_index';
import './database';
import ScheduleToday from './app/jobs/ScheduleToday';

class App {
    public server: Express;
    private jobs: schedule.Job[];

    constructor() {
        this.server = express();
        this.jobs = [];

        this.middlewares();
        this.routes();
        this.startJobs();
    }

    middlewares() {
        this.server.use(cors({
            origin: process.env.FRONTEND_URL,
            optionsSuccessStatus: 200
        }));
        this.server.use(express.json());
    }

    routes() {
        routes(this.server);
    }

    startJobs() {
        this.jobScheduleDay();
    }

    jobScheduleDay() {
        const job = schedule.scheduleJob({hour: 13, minute: 20, dayOfWeek: [1, 2, 3, 4, 5, 6]}, async function() {
            await ScheduleToday.handle();
        });
        this.jobs.push(job);
    }
}

export default new App().server;
