import { Router, Request, Response, NextFunction } from "express";
import { MariaDBService } from "../../service";

class MariaDBController {
    private readonly router = Router();
    private readonly mariadbService = new MariaDBService();
    constructor(){
        this.get();
        this.post();
    }
    get(){
        this.router.get('/', (req:Request, res:Response) => this.mariadbService.insertDevices(req, res));
    }
    post(){
        this.router.post('/', (req:Request, res:Response) => {
            res.send('ok');
        })
    }
    getRouter(){
        return this.router;
    }
}

export default MariaDBController;
