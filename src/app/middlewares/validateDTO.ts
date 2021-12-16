import { Request, Response } from 'express';
import { AnySchema } from 'yup';

export function validateBodyDTO(schema: AnySchema) {
    return async (req: Request, res: Response, next: Function) => {
        try {
            const validatedBody = await schema.validate(req.body);
            req.body = validatedBody;
            next();
        } catch (err) {
            res.status(400).json(err);
        }
    };
}

export function validateParamsDTO(schema: AnySchema) {
    return async (req: Request, res: Response, next: Function) => {
        try {
            const validatedParams = await schema.validate(req.params);
            req.params = validatedParams;
            next();
        } catch (err) {
            res.status(400).json(err);
        }
    };
}
