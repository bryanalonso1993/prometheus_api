import express, { Express } from "express";
/**
 * Environments
 */
import sanitzedConfig from "../config/config";
/**
 * Controladores
 */
import { PrometheusController, AuthenticationController, MariaDBController } from "../controller";
/**
 * Conexiones a las base de datos
 */
import mongoConnection from "../database/mongo/connection";
import connection from "../database/mariadb/connection";
// Modelos de la Base de datos
import "../database/mariadb/models";

/**
 * Logs Aplicacion
 */
import logger from "../utils/logging/logger";
/**
 * APM Server
 */
import apm from "elastic-apm-node";

class Server {
    private readonly app:Express;
    private port:string;
    constructor()
    {
        this.app = express();
        this.port = sanitzedConfig.PORT;
        this.apm();
        this.middlewares();
        this.router();
        this.database();
    }
    router(){
        const [ prometheusController, authenticationController,
                mariadbController ] = [ new PrometheusController(), new AuthenticationController(), new MariaDBController() ];
        this.app.use(`${ sanitzedConfig.GLOBAL_PREFIX }/prometheus`, prometheusController.getRouter());
        this.app.use(`${ sanitzedConfig.GLOBAL_PREFIX }/authentication`, authenticationController.getRouter());
        this.app.use(`${ sanitzedConfig.GLOBAL_PREFIX }/mariadb`, mariadbController.getRouter());
    }
    apm(){
        apm.start({
            serviceName: 'prometheus_api',
            captureBody: 'all',
            serverUrl: sanitzedConfig.APM_SERVER
        });
        if ( apm.isStarted() ) {
            console.log('Running APM Server');
        }
    }
    database(){
        mongoConnection();
        connection.sync()
            .then( () => logger('database', 'info', 'Success Connection ORM Sequelize') )
            .catch( e => logger('database', 'error', `Error connect ORM Sequelize ${ e }`) );
    }
    middlewares(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }
    listen(){
        this.app.listen(this.port, () => console.log(`App running on port ${ this.port }`));
    }
}

export default Server;
