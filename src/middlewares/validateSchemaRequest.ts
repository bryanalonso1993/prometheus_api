import { Request, Response, NextFunction } from "express";
import Joi from "joi";

/**
 * Esquema para validar el token
 */
export const validateSchemaToken = ( req:Request, res:Response, next:NextFunction ) => {
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
/**
 * Esquema para la generacion del Token
 */
export const validateSchemaAuthentication = ( req:Request, res:Response, next:NextFunction ) => {
    interface Auth {
        username: string;
        password: string;
    }
    const auth = req.body as unknown as Auth;
    const schema = Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required()
    });
    const { error } = schema.validate( auth );
    if ( error ) return res.status(400).json({ error: error.details[0].message });
    next();
}

export const validateUniqueRequestPrometheus = ( req:Request, res:Response, next:NextFunction ) => {
    interface ReqPrometheus{
        deviceName:string;
        interfaceName: string;
    }
    const reqBody = req.body as unknown as ReqPrometheus;
    const schema = Joi.object().keys({
        deviceName: Joi.string().required(),
        interfaceName: Joi.string().required()
    });
    const { error } = schema.validate({ reqBody });
    if ( error ) return res.status(400).json({ error: error.details[0].message });
    next();
}

export const validateMultipleRequestPrometheus = ( req:Request, res:Response, next:NextFunction ) => {
    const reqBody = req.body;
    const objectReq = Joi.object().keys({
        deviceName: Joi.string().required(),
        interface: Joi.string().required()
    });
    const schema = Joi.array().items(objectReq);
    const { error } = schema.validate({ reqBody });
    if ( error ) return res.status(400).json({ error: error.details[0].message });
    next();
}

// ESQUEMA PARA LA BASE DE DATOS

export const validateMultipleRequestDevices = ( req:Request, res:Response, next:NextFunction ) => {
    const reqBody = req.body;
    const objectReq = Joi.object().keys({
        deviceName: Joi.string().required(),
        ipAddress: Joi.string().required(),
        category: Joi.string().required(),
        monitoring: Joi.string().required(),
        register: Joi.string().required(),
        enable: Joi.string().required()
    });
    const schema = Joi.array().items(objectReq);
    const { error } = schema.validate( reqBody );
    if ( error ) return res.status(400).json({ error: `Error de esquema ${ error.details[0].message }` });
    next();
}

export const validateSchemaDevicesName = ( req:Request, res:Response, next:NextFunction ) => {
    const reqBody = req.body;
    const objectReq = Joi.object().keys({
        ipAddress: Joi.string().required()
    });
    const schema = Joi.array().items(objectReq);
    const { error } = schema.validate(reqBody);
    if ( error ) return res.status(400).json({ error: error?.details[0]?.message });
    next();
}

export const validateSchemaInterfaces = ( req:Request, res:Response, next:NextFunction ) => {
    const reqBody = req.body;
    const objectReq = Joi.object().keys({
        ipAddress: Joi.string().required(),
        interfaceName: Joi.string().required(),
        max: Joi.number().required(),
        min: Joi.number().required(),
        medicion: Joi.string().required(),
        endpoint: Joi.string().required()
    });
    const schema = Joi.array().items(objectReq);
    const { error } = schema.validate(reqBody);
    if ( error ) return res.status(400).json({ error: error?.details[0]?.message });
    next();
}

export const validateSchemaDevicesInterface = (req:Request, res:Response, next:NextFunction) => {
    const reqBody = req.body;
    const objReq = Joi.object({
        ipAddress: Joi.string().required(),
        interfaceName: Joi.string().required()
    });
    const schema = Joi.array().items(objReq);
    const { error } = schema.validate(reqBody);
    if ( error ) return res.status(400).json({ error: error?.details[0]?.message });
    next();
}

export const validateSchemaDeviceInterface = (req:Request, res:Response, next:NextFunction) => {
    const reqBody = req.body;
    const schema = Joi.object({
        ipAddress: Joi.string().required(),
        interfaceName: Joi.string().required()
    });
    const { error } = schema.validate(reqBody);
    if ( error ) return res.status(400).json({ error: error?.details[0]?.message });
    next();
}

export const validateSchemaDeviceInterfaceDB = (req:Request, res:Response, next:NextFunction) => {
    const reqBody = req.body;
    const objReq = Joi.object().keys({
        ipAddress: Joi.string().required(),
        interfaceName: Joi.string().required()
    });
    const schema = Joi.array().items(objReq);
    const { error } = schema.validate(reqBody);
    if ( error ) return res.status(400).json({ error: error?.details[0]?.message });
    next();
}
