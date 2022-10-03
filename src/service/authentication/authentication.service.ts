import { Token } from "../../interface/authentication.interface";
import { NextFunction, Request, Response } from "express";
import sanitzedConfig from "../../config/config";
import jwt from "jsonwebtoken";

class AuthenticationService {
    /**
     *  Servicio que crea el Token
     */
    createToken(req:Request, res:Response) {
        if ( !(req.path === '/createToken') ) return res.status(401).json({ error: 'Bad Route'});
        if( !req.headers.authorization || req.headers.authorization.indexOf('Basic') === -1 ) return res.status(401).json({ error:'Authentication Service, Missing Authorization Header' });
        const base64Credentials:string = req.headers.authorization.split(' ')[1];
        const credentials:string = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [ username, password ] = credentials.split(':');
        if ( username === sanitzedConfig.USERNAME_API && password === sanitzedConfig.PASSWORD_API )
        {
            const token = jwt.sign({
                data:username
            }, sanitzedConfig.SEED, { expiresIn: '24h'} );
            res.status(200).json({ token });
        }else{
            return res.status(404).json({ error: 'Error de autenticacion '});
        }
    }
    /**
     * Servicio que valida el Token de authenticacion
     */
    validateToken(req:Request, res:Response, next: NextFunction) {
        try {
            const { token } = req.headers as unknown as Token;
            jwt.verify(token, sanitzedConfig.SEED);
            next();
        } catch (error) {
            return res.status(404).json({ error: `Error de autenticacion ${ error }` });
        }
    }
    /**
     * Servicio para responder si el token esta activo o no
     */
    responseToken(req:Request, res:Response) {
        const { token } = req.headers as unknown as Token;
        try {
            jwt.verify(token, sanitzedConfig.SEED);
            return res.status(200).json({
                status: 1,
                message: 'Token Valido'
            });
        } catch (error) {
            return res.status(400).json({
                status: 0,
                message: `Token no es Valido ${ error }`
            });
        }
    }
}

export default AuthenticationService;
