import { Router, Request, Response } from "express";
import { PrometheusService } from "../../service";

class PrometheusController{
    private readonly router = Router();
    private readonly prometheusService = new PrometheusService();
    constructor(){
        this.get();
        // this.post();
    }
    get(){
        this.router.get('/', (req:Request, res:Response) => this.prometheusService.getDevices(req, res));
    }
    post(){
        // this.router.post('/snmptxin', (req:Request, res:Response) => this.prometheusService.getTrafficOutSnmpDevices(req, res));
    }
    getRouter(){
        return this.router;
    }
}

export default PrometheusController;
