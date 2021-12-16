import 'dotenv/config';
import express, { Express } from 'express';
import cors from 'cors';

import routes from './routes/_index';
import './database';

class App {
    public server: Express;

    constructor() {
        this.server = express();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(cors());
        this.server.use(express.json());
        this.server.use(cors());
    }

    routes() {
        routes(this.server);
    }
}

export default new App().server;
