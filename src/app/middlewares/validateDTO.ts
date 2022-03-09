import { Request, Response } from 'express';
import { AnySchema } from 'yup';
import BaseError from '../errors/BaseError';

export function validateBodyDTO(schema: AnySchema) {
    return async (req: Request, res: Response, next: Function) => {
        try {
            const validatedBody = await schema.validate(req.body);
            req.body = validatedBody;
            next();
        } catch (err) {
            res.status(400).json({message: (err as BaseError).message});
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
            res.status(400).json({message: (err as BaseError).message});
        }
    };
}
