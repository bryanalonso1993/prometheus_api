import express, { Request, Response } from "express";
import sanitzedConfig from "../config/config";

class Server {
    private readonly app;
    private port:string;
    constructor()
    {
        this.app = express();
        this.port = sanitzedConfig.PORT;
        this.middlewares();
        this.router();
    }
    router(){
        this.app.post('/', (req:Request, res:Response) => {
            res.send('ok');
        });
    }
    middlewares(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }
    listen(){
        this.app.listen(this.port, () => console.log(`App runnig on port ${ this.port }`));
    }
}

export default Server;
