import express from "express";
import sanitzedConfig from "../config/config";
import ClientController from "../controller/clients/clients.controller";
import mongoConnection from "../database/mongo/connection";

class Server {
    private readonly app;
    private port:string;
    constructor()
    {
        this.app = express();
        this.port = sanitzedConfig.PORT;
        this.middlewares();
        this.router();
        this.database();
    }
    router(){
        const clientController = new ClientController();
        this.app.use(`${ sanitzedConfig.GLOBAL_PREFIX }/client`, clientController.getRouter());
    }
    database(){
        mongoConnection();
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
