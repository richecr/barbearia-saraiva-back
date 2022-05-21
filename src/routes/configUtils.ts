import { Express } from 'express';

import ConfigUtilsController from '@controllers/ConfigUtilsController';

// Add the route in file '_index.ts'
export default function routes(app: Express) {
    app.get(
        '/configs',
        async (req, res) => await ConfigUtilsController.index(req, res),
    );
}
