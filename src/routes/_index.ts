import { Express, Request, Response } from 'express';


import UsersRoutes from './user';
import AuthRoutes from './auth';
import ScheduleRoutes from './schedule';

export default function initRoutes(app: Express) {
    app.get('/api', (req: Request, res: Response) =>
        res.status(200).send({
            message: 'server is running!',
        }),
    );

    // routes
    UsersRoutes(app);
    AuthRoutes(app);
    ScheduleRoutes(app);

    app.all('*', (req: Request, res: Response) =>
        res.status(404).json({ message: 'Route not found!' }),
    );
}
