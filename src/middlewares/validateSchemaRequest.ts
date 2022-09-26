import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const validateSchemaToken = (req:Request, res:Response, next:NextFunction) => {
    interface Token {
        token: string;
    }
    const { token } = req.headers as unknown as Token;
    const schema = Joi.object({
        token: Joi.string().required()
    });
    const { error } = schema.validate({ token });
    if ( error ) return res.status(400).json({ error: error.details[0].message });
    next();
}

export const validateUniqueRequestPrometheus = (req:Request, res:Response, next:NextFunction) => {
    const reqBody = req.body;
    const schema = Joi.object().keys({
        deviceName: Joi.string().required(),
        interface: Joi.string().required()
    });
    const { error } = schema.validate({ reqBody });
    if ( error ) return res.status(400).json({ error: error.details[0].message });
    next();
}

export const validateMultipleRequestPrometheus = (req:Request, res:Response, next:NextFunction) => {
    const reqBody = req.body;
    next();
}
