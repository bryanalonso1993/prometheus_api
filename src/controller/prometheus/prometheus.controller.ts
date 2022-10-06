import { Router, Request, Response, NextFunction } from "express";
import { validateMultipleRequestPrometheus } from "../../middlewares/validateSchemaRequest";
import { PrometheusService, AuthenticationService } from "../../service";

class PrometheusController{
    private readonly router = Router();
    private readonly prometheusService = new PrometheusService();
    private readonly authenticationService = new AuthenticationService();
    constructor(){
        this.get();
    }
    get(){
        this.router.get('/', (req:Request, res:Response) => this.prometheusService.getDevices(req, res));
        this.router.get(
            '/device',
            (req:Request, res:Response, next:NextFunction) => this.authenticationService.validateToken(req, res, next),
            (req:Request, res:Response) => this.prometheusService.getDevices(req, res)
        );
        this.router.get(
            '/interface',
            (req:Request, res:Response, next:NextFunction) => this.authenticationService.validateToken(req, res, next),
            (req:Request, res:Response) => this.prometheusService.getInterfaces(req, res)
        );
        this.router.get(
            '/snmptx(inout)',
            (req:Request, res:Response, next:NextFunction) => this.authenticationService.validateToken(req, res, next),
            (req:Request, res:Response, next:NextFunction) => validateMultipleRequestPrometheus(req, res, next),
            (req:Request, res:Response) => this.prometheusService.getTrafficSnmpDevices(req, res)
            );
    }
    getRouter(){
        return this.router;
    }
}

export default PrometheusController;
