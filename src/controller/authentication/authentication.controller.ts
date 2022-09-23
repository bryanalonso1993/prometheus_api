import { Router, Request, Response, NextFunction } from "express";
import { AuthenticationService } from "../../service";


class AuthenticationController{
    private readonly router = Router();
    private readonly authenticationService = new AuthenticationService();
    constructor(){
        this.get();
        this.post();
    }
    get(){
        this.router.get(
            '/validateToken',
            (req:Request, res:Response, next:NextFunction) => this.authenticationService.validateToken(req, res, next)
        );
        this.router.get(
            '/responseToken',
            (req:Request, res:Response) => this.authenticationService.responseToken(req, res)
        );
    }
    post(){
        this.router.post('/createToken', (req:Request, res:Response) => this.authenticationService.createToken(req, res));
    }
    getRouter(){
        return this.router;
    }
}

export default AuthenticationController;
