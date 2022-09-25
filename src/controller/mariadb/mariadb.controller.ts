import { Router, Request, Response, NextFunction } from "express";
import { MariaDBService } from "../../service";

class MariaDBController {
    private readonly router = Router();
    private readonly mariadbService = new MariaDBService();
    constructor(){
        this.get();
        this.post();
        this.delete();
    }
    get(){
        this.router.get('/device', (req:Request, res:Response) => this.mariadbService.getDevices(req, res));
        this.router.get('/deviceid', (req:Request, res:Response) => this.mariadbService.getDeviceID(req, res));
        this.router.get('/interface', (req:Request, res:Response) => this.mariadbService.getInterface(req, res));
        this.router.get('/interfacedevice', (req:Request, res:Response) => this.mariadbService.getInterfaceDevice(req, res));
    }
    post(){
        this.router.post('/device', (req:Request, res:Response) => this.mariadbService.insertDevices(req, res));
        this.router.post('/interface', (req:Request, res:Response) => this.mariadbService.insertOrUpdateInterface(req, res));
    }
    delete(){
        this.router.delete('/device', (req:Request, res:Response) => this.mariadbService.deleteDevices(req, res));
        this.router.delete('/interface', (req:Request, res:Response) => this.mariadbService.deleteInterface(req, res));
    }
    getRouter(){
        return this.router;
    }
}

export default MariaDBController;
