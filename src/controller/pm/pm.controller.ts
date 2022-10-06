import { NextFunction, Request, Response, Router } from "express";
import { PMService, AuthenticationService } from "../../service";

class PMController {
    private readonly router = Router();
    private readonly pmService = new PMService();
    private readonly authenticationService = new AuthenticationService();
    constructor(){
        this.get();
    }
    get(){
        this.router.get(
            '/listdevicename',
            (req:Request, res:Response, next:NextFunction) => this.authenticationService.validateToken(req, res, next),
            (req:Request, res:Response) => this.pmService.getDevicesInventory(req, res)
        );
    }
    getRouter(){
        return this.router;
    }
}

export default PMController;
