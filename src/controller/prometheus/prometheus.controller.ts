import { Router, Request, Response } from "express";

class PrometheusController{
    protected readonly router = Router();
    constructor(){
        this.get();
        this.post();
    }
    get(){
        this.router.get('/', (req:Request, res:Response) => {
            res.send('prometheus');
        });
    }
    post(){}
    getRouter(){
        return this.router;
    }
}

export default PrometheusController;
