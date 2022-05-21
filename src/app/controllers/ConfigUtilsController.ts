import 'dotenv/config';
import { Request, Response } from 'express';

class ConfigUtilsController {

    async index(req: Request, res: Response) {
        return res.status(200).json({
            qnt_services_to_discount: process.env.QNT_SERVICES_TO_DISCOUNT
        });
    }

}

export default new ConfigUtilsController();
