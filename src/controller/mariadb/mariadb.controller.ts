// Este Controlador usa el servicio de autenticacion
import { Router, Request, Response, NextFunction } from "express";
import { AuthenticationService, MariaDBService } from "../../service";
/**
 * Squemas validacion
 */
import { validateMultipleRequestDevices, validateSchemaInterfaces, validateSchemaDevicesName, validateSchemaDeviceInterface, validateSchemaDeviceInterfaceDB } from "../../middlewares/validateSchemaRequest";

class MariaDBController {
    private readonly router = Router();
    private readonly mariadbService = new MariaDBService();
    private readonly authenticationService = new AuthenticationService();
    constructor(){
        this.get();
        this.post();
        this.delete();
    }
    get(){
        this.router.get(
            '/device',
            (req:Request, res:Response, next:NextFunction) => this.authenticationService.validateToken(req, res, next),
            (req:Request, res:Response) => this.mariadbService.getDevices(req, res)
        );
        this.router.get(
            '/deviceid',
            (req:Request, res:Response, next:NextFunction) => this.authenticationService.validateToken(req, res, next),
            (req:Request, res:Response, next:NextFunction) => validateSchemaDevicesName(req, res, next),
            (req:Request, res:Response) => this.mariadbService.getDeviceID(req, res)
        );
        this.router.get(
            '/interface',
            (req:Request, res:Response, next:NextFunction) => this.authenticationService.validateToken(req, res, next),
            (req:Request, res:Response) => this.mariadbService.getInterface(req, res)
        );
        this.router.get(
            '/interfacedevice',
            (req:Request, res:Response, next:NextFunction) => this.authenticationService.validateToken(req, res, next),
            (req:Request, res:Response, next:NextFunction) => validateSchemaDeviceInterfaceDB(req, res, next),
            (req:Request, res:Response) => this.mariadbService.getInterfaceDevice(req, res)
        );
    }
    post(){
        this.router.post(
            '/device',
            (req:Request, res:Response, next:NextFunction) => this.authenticationService.validateToken(req, res, next),
            (req:Request, res:Response, next:NextFunction) => validateMultipleRequestDevices(req, res, next),
            (req:Request, res:Response) => this.mariadbService.insertDevices(req, res)
        );
        this.router.post(
            '/interface',
            (req:Request, res:Response, next:NextFunction) => this.authenticationService.validateToken(req, res, next),
            (req:Request, res:Response, next:NextFunction) => validateSchemaInterfaces(req, res, next),
            (req:Request, res:Response) => this.mariadbService.insertOrUpdateInterface(req, res));
    }
    delete(){
        this.router.delete(
            '/device',
            (req:Request, res:Response, next:NextFunction) => this.authenticationService.validateToken(req, res, next),
            (req:Request, res:Response, next:NextFunction) => validateSchemaDevicesName(req, res, next),
            (req:Request, res:Response) => this.mariadbService.deleteDevices(req, res)
        );
        this.router.delete(
            '/interface',
            (req:Request, res:Response, next:NextFunction) => this.authenticationService.validateToken(req, res, next),
            (req:Request, res:Response, next:NextFunction) => validateSchemaDeviceInterface(req, res, next),
            (req:Request, res:Response) => this.mariadbService.deleteInterface(req, res)
        );
    }
    getRouter(){
        return this.router;
    }
}

export default MariaDBController;
