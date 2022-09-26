import { collectDefaultMetrics, Registry } from "prom-client";
import { NextFunction, Request, Response } from "express";

const register = new Registry();

const collectMetrics = async (req:Request, res:Response, next:NextFunction) => {
    const registerData = collectDefaultMetrics({ register });
    return res.send( registerData );
}

export default collectMetrics;
