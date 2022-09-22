import { NextFunction, Request, Response } from "express";
import sanitzedConfig from "../../config/config";
import jwt from "jsonwebtoken";

class AuthenticationService {
    /**
     *  Servicio que crea el Token
     */
    createTokenIfExists(req:Request, res:Response) {
        if ( !(req.path === '/createToken') ) return res.status(401).json({ error: 'Bad Route'});
        if( !req.headers.authorization || req.headers.authorization.indexOf('Basic') === -1 ) return res.status(401).json({ error:'Missing Authorization Header' });
        const base64Credentials:string = req.headers.authorization.split(' ')[1];
        const credentials:string = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [ username, password ] = credentials.split(':');
        if ( username === sanitzedConfig.USERNAME_API && password === sanitzedConfig.PASSWORD_API )
        {
            const token = jwt.sign({
                data:username
            }, sanitzedConfig.SEED, { expiresIn: '360d'} );
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
            const token:string | any = req.headers.token;
            jwt.verify(token, sanitzedConfig.SEED);
            next();
        } catch (error) {
            return res.status(404).json({ error: `Error de autenticacion ${ error }` });
        }
    }
}

export default AuthenticationService;
