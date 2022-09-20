import { Router, Request, Response } from "express";

class PrometheusController{
    protected readonly router = Router();
    constructor(){
        this.get();
    }
    get(){
        this.router.get('/', (req:Request, res:Response) => {
            res.send('prometheus');
        });
    }
    getRouter(){
        return this.router;
    }
}

export default PrometheusController;
