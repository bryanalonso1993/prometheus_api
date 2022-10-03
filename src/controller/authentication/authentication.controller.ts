import { Router, Request, Response, NextFunction } from "express";
import { AuthenticationService } from "../../service";

/**
 * Esquemas de validacion de Token
 */
import { validateSchemaAuthentication, validateSchemaToken } from "../../middlewares/validateSchemaRequest";

class AuthenticationController{
    private readonly router = Router();
    private readonly authenticationService = new AuthenticationService();
    constructor(){
        this.get();
        this.post();
    }
    get(){
        // Validate Token
        this.router.get(
            '/validateToken',
            (req:Request, res:Response, next:NextFunction) => validateSchemaToken(req, res, next),
            (req:Request, res:Response, next:NextFunction) => this.authenticationService.validateToken(req, res, next)
        );
        // Respuesta para validar si el token es valido o no
        this.router.get(
            '/responseToken',
            (req:Request, res:Response, next:NextFunction) => validateSchemaToken(req, res, next),
            (req:Request, res:Response) => this.authenticationService.responseToken(req, res)
        );
    }
    post(){
        // Crear Token
        this.router.post(
            '/createToken',
            (req:Request, res:Response) => this.authenticationService.createToken(req, res)
        );
    }
    getRouter(){
        return this.router;
    }
}

export default AuthenticationController;
