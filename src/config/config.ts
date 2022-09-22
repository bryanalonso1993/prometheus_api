import { ENV, Config } from "../interface/config.interface";
/**
 * Importar las variables de entorno
 */
import dotenv from 'dotenv';

const result = dotenv.config({ path: './src/config/.env' });

if ( result.error ) throw result.error;

const getConfig = ():ENV => {
    return {
        PORT: process.env.PORT,
        MONGODB_SERVER: process.env.MONGODB_SERVER,
        GLOBAL_PREFIX: process.env.GLOBAL_PREFIX,
        MARIADB_SERVER: process.env.MARIADB_SERVER,
        MARIADB_ENGINE: process.env.MARIADB_ENGINE,
        MARIADB_USERNAME: process.env.MARIADB_USERNAME,
        MARIADB_PASSWORD: process.env.MARIADB_PASSWORD,
        MARIADB_DATABASE: process.env.MARIADB_DATABASE,
        MARIADB_PORT: process.env.MARIADB_PORT,
        APM_SERVER: process.env.APM_SERVER,
        PROMETHEUS_SERVER: process.env.PROMETHEUS_SERVER,
        SEED: process.env.SEED,
        USERNAME_API: process.env.USERNAME_API,
        PASSWORD_API: process.env.PASSWORD_API,
    }
}

const getSanitzedConfig = ( config:ENV ):Config => {
    for ( const [key, value] of Object.entries(config) ) {
        if ( value === undefined ) {
            throw new Error(`Missing key ${ key } in config.env`);
        }
    }
    return config as Config;
}

const config = getConfig();

const sanitzedConfig = getSanitzedConfig(config);

export default sanitzedConfig;
