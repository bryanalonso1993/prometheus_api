import express, { Express } from "express";
import sanitzedConfig from "../config/config";
import { PrometheusController, PokemonController } from "../controller";
import mongoConnection from "../database/mongo/connection";

class Server {
    private readonly app:Express;
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
        const pokemonController = new PokemonController();
        const prometheusController = new PrometheusController();
        this.app.use(`${ sanitzedConfig.GLOBAL_PREFIX }/pokemon`, pokemonController.getRouter());
        this.app.use(`${ sanitzedConfig.GLOBAL_PREFIX }/prometheus`, prometheusController.getRouter());
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
